
/**
 * @fileoverview This script seeds the Firestore database with realistic demo data for a specific tenant.
 * It is idempotent, meaning it can be run multiple times without creating duplicate data.
 *
 * To run this script:
 * 1. Make sure you have a `service-account.json` file in the root of the project.
 * 2. Run `npm run db:seed` from your terminal.
 */

import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { addDays, subDays, formatISO, addHours, subMinutes } from 'date-fns';

// --- Configuration ---
const DEMO_TENANT_ID = 'veralogix-pilbara';
const DEV_USER_EMAIL = 'dev@veralogix.com';
const DEV_USER_PASSWORD = 'veralogix';

// --- Firebase Admin Initialization ---
try {
  const serviceAccount = require('../service-account.json');
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log('Firebase Admin SDK initialized successfully.');
  }
} catch (error) {
  console.error(
    'Error initializing Firebase Admin SDK. Please ensure a valid `service-account.json` file exists in the project root.'
  );
  process.exit(1);
}

const db = getFirestore();
const auth = getAuth();

// --- Helper Functions ---

async function createAuthUserIfNotExists(uid: string, email: string, password?: string) {
    try {
        await auth.getUser(uid);
        console.log(`Auth user ${email} already exists.`);
        // Optionally update user if needed
        if (password) {
            await auth.updateUser(uid, { email, password });
            console.log(`Updated password for ${email}.`);
        }
    } catch (error: any) {
        if (error.code === 'auth/user-not-found') {
            console.log(`Creating auth user: ${email}`);
            await auth.createUser({
                uid,
                email,
                password,
                emailVerified: true,
            });
            console.log(`Successfully created auth user: ${email}`);
        } else {
            throw error;
        }
    }
}


async function clearCollection(collectionName: string) {
  console.log(`Clearing collection: ${collectionName} for tenant: ${DEMO_TENANT_ID}`);
  const collectionRef = db.collection(collectionName);
  const q = collectionRef.where('tenantId', '==', DEMO_TENANT_ID);
  const snapshot = await q.get();

  if (snapshot.empty) {
    console.log(`No documents to delete in ${collectionName}.`);
    return;
  }

  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();
  console.log(`Deleted ${snapshot.size} documents from ${collectionName}.`);
}

async function seedCollection(collectionName: string, data: any[], idField?: string) {
  console.log(`Seeding collection: ${collectionName} with ${data.length} documents.`);
  const collectionRef = db.collection(collectionName);
  const batch = db.batch();

  data.forEach((item) => {
    const docRef = idField ? collectionRef.doc(item[idField]) : collectionRef.doc();
    batch.set(docRef, { ...item, tenantId: DEMO_TENANT_ID });
  });

  await batch.commit();
  console.log(`Seeded ${data.length} documents into ${collectionName}.`);
}

// --- Data Generators ---

function generateUsers() {
    return [
        { uid: 'dev-user', email: DEV_USER_EMAIL, displayName: 'Dev User', roleIds: ['admin'] },
        { uid: 'admin-user-01', email: 'admin@veralogix.com', displayName: 'Admin User', roleIds: ['admin'] },
        { uid: 'manager-user-01', email: 'manager@veralogix.com', displayName: 'Shift Manager', roleIds: ['supervisor'] },
        { uid: 'employee-user-01', email: 'employee@veralogix.com', displayName: 'John Doe', roleIds: ['operator'] },
        { uid: 'employee-user-02', email: 'employee2@veralogix.com', displayName: 'Jane Smith', roleIds: ['operator'] },
    ];
}

function generateRolesAndPermissions() {
    const permissions = [
        // User Permissions
        { id: 'users.read', description: 'Read user information', category: 'Users' },
        { id: 'users.write', description: 'Create and update users', category: 'Users' },
        { id: 'users.assign-roles', description: 'Assign roles to users', category: 'Users' },
        // Role Permissions
        { id: 'roles.read', description: 'Read role information', category: 'Roles' },
        { id: 'roles.write', description: 'Create and update roles', category: 'Roles' },
        // Payslip Permissions
        { id: 'payslip.read.own', description: 'Read own payslips', category: 'Payslips' },
        { id: 'payslip.import', description: 'Import payslips for payroll', category: 'Payslips' },
        // General module permissions
        { id: 'fleet.read', description: 'Read fleet data', category: 'Fleet' },
        { id: 'safety.read', description: 'Read safety data', category: 'Safety' },
        { id: 'plant.read', description: 'Read plant data', category: 'Plant' },
    ];

    const roles = [
        {
            id: 'admin',
            name: 'Administrator',
            description: 'Has all permissions across the system.',
            permissions: permissions.map(p => p.id), // All permissions
        },
        {
            id: 'supervisor',
            name: 'Supervisor',
            description: 'Manages a team and approves inputs.',
            permissions: ['users.read', 'fleet.read', 'safety.read', 'plant.read'],
        },
        {
            id: 'operator',
            name: 'Operator',
            description: 'Views own data and performs operational tasks.',
            permissions: ['payslip.read.own'],
        },
    ];

    return { roles, permissions };
}

function generatePayslips() {
  const now = new Date();
  return [
    { payPeriod: '2024-07', uid: 'employee-user-01', employeeId: 'EMP001', issuedAt: formatISO(subDays(now, 5)), storagePath: '/mock/payslip.pdf', status: 'available' },
    { payPeriod: '2024-06', uid: 'employee-user-01', employeeId: 'EMP001', issuedAt: formatISO(subDays(now, 35)), storagePath: '/mock/payslip.pdf', status: 'available', readAt: formatISO(subDays(now, 30)) },
    { payPeriod: '2024-07', uid: 'employee-user-02', employeeId: 'EMP002', issuedAt: formatISO(subDays(now, 5)), storagePath: '/mock/payslip.pdf', status: 'available' },
  ];
}

function generatePaperlessConsents() {
    return [
        { uid: 'employee-user-01', consentGiven: true, consentAt: formatISO(new Date()) },
        { uid: 'employee-user-02', consentGiven: false, consentAt: null },
    ];
}

function generateEmployeeProfiles() {
    return [
        { uid: 'dev-user', employeeId: 'DEV001', firstName: 'Dev', lastName: 'User', position: 'Developer', department: 'IT', site: 'Head Office', contact: { phone: '555-0100', email: DEV_USER_EMAIL } },
        { uid: 'employee-user-01', employeeId: 'EMP001', firstName: 'John', lastName: 'Doe', position: 'Haul Truck Operator', department: 'Operations', site: 'Pilbara Mine', contact: { phone: '555-0101', email: 'employee@veralogix.com' }},
        { uid: 'employee-user-02', employeeId: 'EMP002', firstName: 'Jane', lastName: 'Smith', position: 'Excavator Operator', department: 'Operations', site: 'Pilbara Mine', contact: { phone: '555-0102', email: 'employee2@veralogix.com' }},
        { uid: 'admin-user-01', employeeId: 'ADM001', firstName: 'Admin', lastName: 'User', position: 'System Administrator', department: 'IT', site: 'Head Office', contact: { phone: '555-0103', email: 'admin@veralogix.com' }},
        { uid: 'manager-user-01', employeeId: 'MGR001', firstName: 'Shift', lastName: 'Manager', position: 'Supervisor', department: 'Operations', site: 'Pilbara Mine', contact: { phone: '555-0104', email: 'manager@veralogix.com' }},
    ];
}

function generateTrainingRecords() {
    const now = new Date();
    return [
        { uid: 'employee-user-01', courseName: 'Haul Truck Operation', status: 'Compliant', expiryDate: formatISO(addDays(now, 300)) },
        { uid: 'employee-user-01', courseName: 'Working at Heights', status: 'Expiring Soon', expiryDate: formatISO(addDays(now, 25)) },
        { uid: 'employee-user-02', courseName: 'Excavator Operation', status: 'Compliant', expiryDate: formatISO(addDays(now, 400)) },
        { uid: 'employee-user-02', courseName: 'First Aid Level 1', status: 'Expired', expiryDate: formatISO(subDays(now, 10)) },
    ];
}

function generateAlerts() {
    const now = new Date();
    return [
        { moduleKey: 'plant', severity: 'Critical', description: 'Conveyor C-12 motor temperature exceeding limits.', status: 'New', createdAt: admin.firestore.Timestamp.fromDate(subMinutes(now, 15)) },
        { moduleKey: 'fleet', severity: 'High', description: 'Truck T-78 reported brake warning.', status: 'New', createdAt: admin.firestore.Timestamp.fromDate(subMinutes(now, 45)) },
        { moduleKey: 'safety', severity: 'Medium', description: 'Speed violation in Zone B.', status: 'Investigating', createdAt: admin.firestore.Timestamp.fromDate(subHours(now, 2)) },
    ];
}

function generateTasks() {
    const now = new Date();
    return [
        { moduleKey: 'safety', taskType: 'CAPA', description: 'Investigate spill at refueling station.', status: 'Todo', dueDate: formatISO(addDays(now, 2)), assignee: 'Supervisor A' },
        { moduleKey: 'fleet', taskType: 'Inspection', description: 'Routine inspection for T-78.', status: 'Todo', dueDate: formatISO(addDays(now, 1)), assignee: 'Mechanic B' },
    ];
}

function generateLoadPassports() {
    const now = new Date();
    return [
        { passportId: 'LP-2024-001', vehicleId: 'TRK-101', materialType: 'Iron Ore', origin: 'Pit A', destination: 'Crusher', status: 'Completed', createdAt: admin.firestore.Timestamp.fromDate(subHours(now, 4)), lastUpdatedAt: formatISO(subHours(now, 3)) },
        { passportId: 'LP-2024-002', vehicleId: 'TRK-102', materialType: 'Iron Ore', origin: 'Pit B', destination: 'Stockpile', status: 'In Progress', createdAt: admin.firestore.Timestamp.fromDate(subMinutes(now, 20)), lastUpdatedAt: formatISO(subMinutes(now, 5)) },
        { passportId: 'LP-2024-003', vehicleId: 'TRK-103', materialType: 'Waste', origin: 'Pit A', destination: 'Dump 2', status: 'Exception', createdAt: admin.firestore.Timestamp.fromDate(subHours(now, 1)), lastUpdatedAt: formatISO(subMinutes(now, 45)) },
    ];
}

function generateBlastDesigns() {
    return [
        { blastId: 'B-07-N1', location: 'Pit B North Wall', designDate: formatISO(new Date()), powderFactor: 0.85, status: 'Designed' },
        { blastId: 'B-07-S2', location: 'Pit B South Wall', designDate: formatISO(subDays(new Date(), 1)), powderFactor: 0.92, status: 'Charged' },
    ];
}

function generateDrillLogs() {
    return [
        { holeId: 'H-1001', blastId: 'B-07-N1', depth: 15.2, location: '-22.123, 118.456', timestamp: formatISO(new Date()) },
        { holeId: 'H-1002', blastId: 'B-07-N1', depth: 14.8, location: '-22.123, 118.457', timestamp: formatISO(new Date()) },
    ];
}

function generateStockpiles() {
    return [
        { stockpileName: 'ROM Pad A', measuredVolume: 12500, measuredTonnage: 31250, surveyDate: formatISO(new Date()), surveyMethod: 'Drone' },
        { stockpileName: 'Product Stockpile', measuredVolume: 8000, measuredTonnage: 20000, surveyDate: formatISO(new Date()), surveyMethod: 'Scanner' },
    ];
}


// --- Main Execution ---

async function main() {
  console.log('Starting Firestore database seeding...');

  try {
    // Create the dev user in Firebase Auth
    await createAuthUserIfNotExists('dev-user', DEV_USER_EMAIL, DEV_USER_PASSWORD);

    // Clear existing demo data
    await clearCollection('users');
    await clearCollection('roles');
    await clearCollection('permissions');
    await clearCollection('payslips');
    await clearCollection('paperlessConsents');
    await clearCollection('employeeProfiles');
    await clearCollection('trainingRecords');
    await clearCollection('alerts');
    await clearCollection('tasks');
    await clearCollection('loadPassports');
    await clearCollection('blastDesigns');
    await clearCollection('drillLogs');
    await clearCollection('stockpileVolumes');
    
    // Generate new data
    const users = generateUsers();
    const { roles, permissions } = generateRolesAndPermissions();
    const payslips = generatePayslips();
    const consents = generatePaperlessConsents();
    const profiles = generateEmployeeProfiles();
    const training = generateTrainingRecords();
    const alerts = generateAlerts();
    const tasks = generateTasks();
    const passports = generateLoadPassports();
    const blasts = generateBlastDesigns();
    const drillLogs = generateDrillLogs();
    const stockpiles = generateStockpiles();

    // Seed collections with new data
    await seedCollection('users', users, 'uid');
    await seedCollection('roles', roles, 'id');
    await seedCollection('permissions', permissions, 'id');
    await seedCollection('payslips', payslips);
    await seedCollection('paperlessConsents', consents, 'uid');
    await seedCollection('employeeProfiles', profiles, 'uid');
    await seedCollection('trainingRecords', training);
    await seedCollection('alerts', alerts);
    await seedCollection('tasks', tasks);
    await seedCollection('loadPassports', passports, 'passportId');
    await seedCollection('blastDesigns', blasts);
    await seedCollection('drillLogs', drillLogs);
    await seedCollection('stockpileVolumes', stockpiles);

    console.log('\n✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('\n❌ An error occurred during database seeding:', error);
    process.exit(1);
  }
}

main();
