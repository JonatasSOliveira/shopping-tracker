import { SignInRequestDTO } from "@/dtos/auth/request/SignIn";
import { SignUpRequestDTO } from "@/dtos/auth/request/SignUp";
import { AuthResponseDTO } from "@/dtos/auth/response/Auth";
import { FirebaseProvider } from "@/infra/firebase/Provider";
import { AuthManagerPortOut } from "@/ports/out/AuthManager";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export class FirebaseAuthManagerAdapter implements AuthManagerPortOut {
  public async signIn(data: SignInRequestDTO): Promise<AuthResponseDTO> {
    const userCredential = await signInWithEmailAndPassword(
      FirebaseProvider.getAuth(),
      data.email,
      data.password,
    );
    return { id: userCredential.user.uid };
  }

  public async signUp(data: SignUpRequestDTO): Promise<AuthResponseDTO> {
    const userCredential = await createUserWithEmailAndPassword(
      FirebaseProvider.getAuth(),
      data.email,
      data.password,
    );

    return { id: userCredential.user.uid };
  }
}
