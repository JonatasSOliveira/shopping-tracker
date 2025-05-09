import {
  FirebaseFirestoreTypes,
  getFirestore as fbGetFirestore,
} from "@react-native-firebase/firestore";

export class FirebaseProvider {
  public static getFirestore(): FirebaseFirestoreTypes.Module {
    return fbGetFirestore();
  }
}
