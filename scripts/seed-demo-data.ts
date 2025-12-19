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
import { addDays, subDays, formatISO } from 'date-fns';

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

    console.log('\n✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('\n❌ An error occurred during database seeding:', error);
    process.exit(1);
  }
}

main();
