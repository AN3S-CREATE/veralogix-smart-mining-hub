'use client';

import { initializeApp, getApp, getApps, type FirebaseOptions } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

import { firebaseConfig } from "./config";
import {
  FirebaseProvider,
  FirebaseClientProvider,
  useFirebase,
  useFirebaseApp,
  useFirestore,
  useAuth,
} from "./provider";

export function initializeFirebase(options: FirebaseOptions = firebaseConfig) {
  if (getApps().length > 0) {
    return {
      firebaseApp: getApp(),
      firestore: getFirestore(),
      auth: getAuth(),
    };
  }

  const firebaseApp = initializeApp(options);
  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);

  if (process.env.NEXT_PUBLIC_EMULATOR_HOST) {
    const host = process.env.NEXT_PUBLIC_EMULATOR_HOST;
    connectAuthEmulator(auth, `http://${host}:9099`, {
      disableWarnings: true,
    });
    connectFirestoreEmulator(firestore, host, 8080);
  }

  return { firebaseApp, auth, firestore };
}


export {
  firebaseConfig,
  FirebaseProvider,
  FirebaseClientProvider,
  useFirebase,
  useFirebaseApp,
  useFirestore,
  useAuth,
};
