import { SignInRequestDTO } from "@/dtos/auth/request/SignIn";
import { SignUpRequestDTO } from "@/dtos/auth/request/SignUp";
import { UserSessionDTO } from "@/dtos/user/Session";

export interface AuthPortIn {
  signIn(data: SignInRequestDTO): Promise<void>;
  signUp(data: SignUpRequestDTO): Promise<void>;
  getSession(): Promise<UserSessionDTO | null>;
  signOut(): Promise<void>;
}
