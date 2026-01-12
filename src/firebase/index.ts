
'use client';

import { initializeApp, getApp, getApps, type FirebaseOptions } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { firebaseConfig } from "./config";
import { useMemo } from "react";

// Export the necessary hooks and components from the providers
export { FirebaseProvider, FirebaseClientProvider, useFirebase, useFirebaseApp, useFirestore, useAuth } from "./provider";
export { useCollection } from "./firestore/use-collection";
export { useDoc } from "./firestore/use-doc";
export { useUser } from "./auth/use-user";
export { useMemoFirebase } from "./use-memo-firebase";

// Centralized initialization function
export function initializeFirebase(options: FirebaseOptions = firebaseConfig) {
  if (getApps().length > 0) {
    const app = getApp();
    return {
      firebaseApp: app,
      firestore: getFirestore(app),
      auth: getAuth(app),
    };
  }

  const firebaseApp = initializeApp(options);
  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);

  // Connect to emulators if in development
  if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_EMULATOR_HOST) {
    const host = process.env.NEXT_PUBLIC_EMULATOR_HOST;
    // Check if emulators are already running to avoid re-connecting
    // This is a simplified check; a more robust solution might use a global flag.
    // @ts-ignore - _isInitialized is not in the official type but can be a useful private flag
    if (!auth.emulatorConfig) {
       connectAuthEmulator(auth, `http://${host}:9099`, {
        disableWarnings: true,
      });
    }
    // @ts-ignore
    if (!firestore.toJSON().settings.host) {
        connectFirestoreEmulator(firestore, host, 8080);
    }
  }

  return { firebaseApp, auth, firestore };
}
