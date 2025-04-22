import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { Auth, getAuth } from "firebase/auth";

import { firebaseConfig } from "./config";

export class FirebaseProvider {
  private static app?: FirebaseApp;
  private static db?: Firestore;
  private static auth?: Auth;

  private static getApp(): FirebaseApp {
    if (!FirebaseProvider.app) {
      FirebaseProvider.app = initializeApp(firebaseConfig);
    }
    return FirebaseProvider.app;
  }

  public static getFirestore(): Firestore {
    if (!FirebaseProvider.db) {
      FirebaseProvider.db = getFirestore(FirebaseProvider.getApp());
    }
    return FirebaseProvider.db;
  }

  public static getAuth(): Auth {
    if (!FirebaseProvider.auth) {
      FirebaseProvider.auth = getAuth(FirebaseProvider.getApp());
    }
    return FirebaseProvider.auth;
  }
}
