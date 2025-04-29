import { SignInRequestDTO } from "@/dtos/auth/request/SignIn";
import { SignUpRequestDTO } from "@/dtos/auth/request/SignUp";
import { AuthResponseDTO } from "@/dtos/auth/response/Auth";
import { UserSessionDTO } from "@/dtos/user/Session";

export interface AuthManagerPortOut {
  signIn(data: SignInRequestDTO): Promise<AuthResponseDTO>;
  signUp(data: SignUpRequestDTO): Promise<AuthResponseDTO>;
  signOut(session: UserSessionDTO): Promise<void>;
}
