
import * as admin from 'firebase-admin';

// Check if we are already initialized
if (!admin.apps.length) {
  try {
    // In a real app, use environment variables for credentials or default credentials
    // For this prototype, we might rely on default Google Cloud credentials if deployed,
    // or a service account key if local. 
    // This is a placeholder for the actual initialization logic.
    admin.initializeApp();
  } catch (error) {
    console.error('Firebase Admin init error', error);
  }
}

export const adminAuth = admin.apps.length ? admin.auth() : null;
export const adminFirestore = admin.apps.length ? admin.firestore() : null;
