
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
// This is the tenant ID for which the data will be generated.
const DEMO_TENANT_ID = 'veralogix-pilbara';

// --- Firebase Admin Initialization ---
try {
  const serviceAccount = require('../service-account.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log('Firebase Admin SDK initialized successfully.');
} catch (error) {
  console.error(
    'Error initializing Firebase Admin SDK. Please ensure a valid `service-account.json` file exists in the project root.'
  );
  process.exit(1);
}

const db = getFirestore();

// --- Helper Functions ---

/**
 * Deletes all documents in a collection that match a specific tenantId.
 * @param collectionName The name of the collection to clear.
 */
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

/**
 * Deletes all subcollections within a collection for a specific tenantId.
 * @param parentCollectionName The name of the parent collection.
 * @param subCollectionName The name of the subcollection to clear.
 */
async function clearSubCollections(parentCollectionName: string, subCollectionName: string) {
  console.log(`Clearing subcollection: ${subCollectionName} in ${parentCollectionName} for tenant: ${DEMO_TENANT_ID}`);
  const parentCollectionRef = db.collection(parentCollectionName);
  const q = parentCollectionRef.where('tenantId', '==', DEMO_TENANT_ID);
  const parentSnapshot = await q.get();

  if (parentSnapshot.empty) {
    console.log(`No parent documents found in ${parentCollectionName}.`);
    return;
  }

  for (const doc of parentSnapshot.docs) {
    const subCollectionRef = doc.ref.collection(subCollectionName);
    const snapshot = await subCollectionRef.get();
    if (!snapshot.empty) {
      const batch = db.batch();
      snapshot.docs.forEach(subDoc => {
        batch.delete(subDoc.ref);
      });
      await batch.commit();
      console.log(`Deleted ${snapshot.size} documents from ${subCollectionName} in doc ${doc.id}.`);
    }
  }
}

/**
 * Seeds a collection with the given data.
 * @param collectionName The name of the collection to seed.
 * @param data An array of documents to add to the collection.
 */
async function seedCollection(collectionName: string, data: any[]) {
  console.log(`Seeding collection: ${collectionName} with ${data.length} documents.`);
  const collectionRef = db.collection(collectionName);
  const batch = db.batch();

  data.forEach((item) => {
    const docRef = collectionRef.doc(); // Automatically generate a document ID
    batch.set(docRef, { ...item, tenantId: DEMO_TENANT_ID });
  });

  await batch.commit();
  console.log(`Seeded ${data.length} documents into ${collectionName}.`);
}


/**
 * Seeds load passport data, including nested events.
 */
async function seedLoadPassports() {
    const passports = generateLoadPassports();
    console.log(`Seeding collection: loadPassports with ${passports.length} documents.`);

    for (const passport of passports) {
        const { events, ...passportData } = passport;
        const passportRef = db.collection('loadPassports').doc(passportData.passportId);
        await passportRef.set({ ...passportData, tenantId: DEMO_TENANT_ID });

        const eventsRef = passportRef.collection('loadEvents');
        const batch = db.batch();
        events.forEach(event => {
            const eventRef = eventsRef.doc();
            batch.set(eventRef, event);
        });
        await batch.commit();

        // Also create alerts for exceptions
        for (const event of events) {
            if (event.eventType === 'exception') {
                await db.collection('alerts').add({
                    tenantId: DEMO_TENANT_ID,
                    moduleKey: 'load-passport',
                    severity: event.details.severity || 'Warning',
                    status: 'New',
                    description: `Load Passport ${passportData.passportId}: ${event.summary}`,
                    createdAt: event.timestamp,
                });
            }
        }
    }
    console.log(`Seeded ${passports.length} load passports and their events.`);
}


// --- Data Generators ---

function generateComplianceItems() {
  const now = new Date();
  return [
    // Licenses
    { type: 'License', subject: 'V0822', expiryDate: formatISO(addDays(now, 25)), status: 'Expiring Soon' },
    { type: 'License', subject: 'C1045', expiryDate: formatISO(subDays(now, 10)), status: 'Expired' },
    { type: 'License', subject: 'V0731', expiryDate: formatISO(addDays(now, 150)), status: 'Compliant' },
    
    // Medicals
    { type: 'Medical', subject: 'C3312', expiryDate: formatISO(addDays(now, 3)), status: 'Expiring Soon' },
    { type: 'Medical', subject: 'V0910', expiryDate: formatISO(addDays(now, 90)), status: 'Compliant' },

    // Training
    { type: 'Training', subject: 'V0822', expiryDate: formatISO(addDays(now, 18)), status: 'Expiring Soon' },
    { type: 'Training', subject: 'C3312', expiryDate: formatISO(addDays(now, 200)), status: 'Compliant' },
  ];
}

function generateCapaActions() {
  const now = new Date();
  return [
    { description: 'Investigate Ramp 3 near-miss hotspots.', dueDate: formatISO(addDays(now, 7)), status: 'Open' },
    { description: 'Review Cabin-Eye fatigue events on Night Shift Pit 2.', dueDate: formatISO(addDays(now, 3)), status: 'In Progress' },
    { description: 'Schedule toolbox talk at East Dump intersection.', dueDate: formatISO(subDays(now, 2)), status: 'Open' },
  ];
}

function generateFleetInspections() {
    const now = new Date();
    return [
        { assetId: 'TRK-205', inspectionType: '60-day Service', dueDate: formatISO(subDays(now, 5)), status: 'Overdue' },
        { assetId: 'TRK-312', inspectionType: 'Pre-shift Checklist', dueDate: formatISO(now), status: 'Due' },
        { assetId: 'FEL-03', inspectionType: 'Hydraulic Check', dueDate: formatISO(addDays(now, 6)), status: 'Due' },
    ];
}

function generateInventoryItems() {
    return [
        { itemName: 'Crusher Bearing G-255', quantity: 2, location: 'Warehouse A', reorderPoint: 2, isCritical: true },
        { itemName: 'Haul Truck Tyre 27.00R49', quantity: 8, location: 'Tyre Bay', reorderPoint: 4, isCritical: true },
        { itemName: 'Standard Air Filter', quantity: 55, location: 'Warehouse B', reorderPoint: 20, isCritical: false },
        { itemName: 'Conveyor Belt Section (10m)', quantity: 1, location: 'Warehouse A', reorderPoint: 2, isCritical: true },
    ];
}

function generateEnergyAndEnvironmentalData() {
    const now = new Date();
    const energy = [
        { timestamp: formatISO(subDays(now, 1)), site: 'Crusher', metricName: 'Consumption', value: 1200, unit: 'kWh' },
        { timestamp: formatISO(subDays(now, 1)), site: 'Plant', metricName: 'Consumption', value: 3400, unit: 'kWh' },
    ];
    const environmental = [
        { timestamp: formatISO(subDays(now, 2)), metricType: 'Dust Level', value: 55.2, unit: 'mg/m³', complianceStatus: 'Breach' },
        { timestamp: formatISO(subDays(now, 1)), metricType: 'Water Quality', value: 7.2, unit: 'pH', complianceStatus: 'Compliant' },
        { timestamp: formatISO(now), metricType: 'Noise Level', value: 88, unit: 'dB', complianceStatus: 'Warning' },
    ];
    return { energy, environmental };
}

function generateLoadPassports() {
    const now = new Date();
    return [
        {
            passportId: 'LP-240719-001',
            vehicleId: 'TRK-203',
            materialType: 'High-Grade Ore',
            status: 'In Progress',
            origin: 'Shovel 2',
            destination: 'ROM Pad A',
            createdAt: formatISO(subMinutes(now, 45)),
            lastUpdatedAt: formatISO(subMinutes(now, 5)),
            events: [
                { eventType: 'dispatch', summary: 'Dispatched to Shovel 2', location: 'Control Room', timestamp: formatISO(subMinutes(now, 45)), details: {} },
                { eventType: 'loadscan', summary: 'Loaded 65.2t of High-Grade Ore', location: 'Shovel 2', timestamp: formatISO(subMinutes(now, 30)), details: { payload: 65.2 } },
                { eventType: 'route_update', summary: 'Route to ROM Pad A confirmed', location: 'On Route', timestamp: formatISO(subMinutes(now, 28)), details: {} },
            ],
        },
        {
            passportId: 'LP-240719-002',
            vehicleId: 'TRK-310',
            materialType: 'Waste Rock',
            status: 'Exception',
            origin: 'Shovel 1',
            destination: 'West Dump',
            createdAt: formatISO(subMinutes(now, 65)),
            lastUpdatedAt: formatISO(subMinutes(now, 15)),
            events: [
                { eventType: 'dispatch', summary: 'Dispatched to Shovel 1', location: 'Control Room', timestamp: formatISO(subMinutes(now, 65)), details: {} },
                { eventType: 'loadscan', summary: 'Loaded 68.9t of Waste Rock', location: 'Shovel 1', timestamp: formatISO(subMinutes(now, 50)), details: { payload: 68.9 } },
                { eventType: 'exception', summary: 'Overload detected at weighbridge', location: 'Weighbridge 1', timestamp: formatISO(subMinutes(now, 15)), details: { severity: 'High', expected: 65, actual: 68.9 } },
            ],
        },
        {
            passportId: 'LP-240719-003',
            vehicleId: 'TRK-205',
            materialType: 'Low-Grade Ore',
            status: 'Completed',
            origin: 'Shovel 3',
            destination: 'ROM Pad B',
            createdAt: formatISO(subHours(now, 2)),
            lastUpdatedAt: formatISO(subHours(now, 1)),
            events: [
                { eventType: 'dispatch', summary: 'Dispatched to Shovel 3', location: 'Control Room', timestamp: formatISO(subHours(now, 2)), details: {} },
                { eventType: 'loadscan', summary: 'Loaded 63.1t of Low-Grade Ore', location: 'Shovel 3', timestamp: formatISO(subMinutes(now, 105)), details: { payload: 63.1 } },
                { eventType: 'weighbridge', summary: 'Weight confirmed: 63.0t', location: 'Weighbridge 2', timestamp: formatISO(subMinutes(now, 75)), details: { weight: 63.0 } },
                { eventType: 'delivery', summary: 'Delivered to ROM Pad B', location: 'ROM Pad B', timestamp: formatISO(subHours(now, 1)), details: {} },
            ],
        },
    ];
}

// --- Main Execution ---

async function main() {
  console.log('Starting Firestore database seeding...');

  try {
    // Clear existing demo data
    await clearCollection('complianceItems');
    await clearCollection('capaActions');
    await clearCollection('fleetInspections');
    await clearCollection('inventoryItems');
    await clearCollection('energyMetrics');
    await clearCollection('environmentalData');
    await clearSubCollections('loadPassports', 'loadEvents');
    await clearCollection('loadPassports');
    await clearCollection('alerts'); // Clear alerts to avoid keeping old exception alerts
    
    // Generate new data
    const complianceItems = generateComplianceItems();
    const capaActions = generateCapaActions();
    const fleetInspections = generateFleetInspections();
    const inventoryItems = generateInventoryItems();
    const { energy, environmental } = generateEnergyAndEnvironmentalData();
    
    // Seed collections with new data
    await seedCollection('complianceItems', complianceItems);
    await seedCollection('capaActions', capaActions);
    await seedCollection('fleetInspections', fleetInspections);
    await seedCollection('inventoryItems', inventoryItems);
    await seedCollection('energyMetrics', energy);
    await seedCollection('environmentalData', environmental);
    await seedLoadPassports();

    console.log('\n✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('\n❌ An error occurred during database seeding:', error);
    process.exit(1);
  }
}

main();
