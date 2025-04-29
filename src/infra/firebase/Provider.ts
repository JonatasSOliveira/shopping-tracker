import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";

export class FirebaseProvider {
  public static getAuth(): FirebaseAuthTypes.Module {
    return auth();
  }

  public static getFirestore(): FirebaseFirestoreTypes.Module {
    return firestore();
  }
}
