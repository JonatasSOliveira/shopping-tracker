import { SignInRequestDTO } from "@/dtos/auth/request/SignIn";
import { SignUpRequestDTO } from "@/dtos/auth/request/SignUp";
import { AuthResponseDTO } from "@/dtos/auth/response/Auth";
import { UserSessionDTO } from "@/dtos/user/Session";
import { AuthManagerPortOut } from "@/ports/out/AuthManager";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "@react-native-firebase/auth";

export class FirebaseAuthManagerAdapter implements AuthManagerPortOut {
  private auth = getAuth();

  public async signIn(data: SignInRequestDTO): Promise<AuthResponseDTO> {
    const userCredential = await signInWithEmailAndPassword(
      this.auth,
      data.email,
      data.password,
    );
    return { id: userCredential.user.uid };
  }

  public async signUp(data: SignUpRequestDTO): Promise<AuthResponseDTO> {
    const userCredential = await createUserWithEmailAndPassword(
      this.auth,
      data.email,
      data.password,
    );
    return { id: userCredential.user.uid };
  }

  public async signOut(session: UserSessionDTO): Promise<void> {
    await signOut(this.auth);
  }
}
