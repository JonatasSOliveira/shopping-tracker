import { SignInRequestDTO } from "@/dtos/auth/request/SignIn";
import { SignUpRequestDTO } from "@/dtos/auth/request/SignUp";

export interface AuthPortIn {
  signIn(data: SignInRequestDTO): Promise<void>;
  signUp(data: SignUpRequestDTO): Promise<void>;
}
