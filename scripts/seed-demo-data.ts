
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
import { addDays, subDays, formatISO, addHours, subMinutes } from 'date-fns';

// --- Configuration ---
const DEMO_TENANT_ID = 'veralogix-pilbara';

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

// --- Helper Functions ---
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


// --- Main Execution ---

async function main() {
  console.log('Starting Firestore database seeding...');

  try {
    // Clear existing demo data
    await clearCollection('users');
    await clearCollection('roles');
    await clearCollection('permissions');
    await clearCollection('payslips');
    await clearCollection('paperlessConsents');
    await clearCollection('employeeProfiles');
    await clearCollection('trainingRecords');
    
    // Generate new data
    const users = generateUsers();
    const { roles, permissions } = generateRolesAndPermissions();
    const payslips = generatePayslips();
    const consents = generatePaperlessConsents();
    const profiles = generateEmployeeProfiles();
    const training = generateTrainingRecords();

    // Seed collections with new data
    await seedCollection('users', users, 'uid');
    await seedCollection('roles', roles, 'id');
    await seedCollection('permissions', permissions, 'id');
    await seedCollection('payslips', payslips);
    await seedCollection('paperlessConsents', consents, 'uid');
    await seedCollection('employeeProfiles', profiles, 'uid');
    await seedCollection('trainingRecords', training);

    console.log('\n✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('\n❌ An error occurred during database seeding:', error);
    process.exit(1);
  }
}

main();
