import { SignInRequestDTO } from "@dtos/request/SignIn";
import { SignUpRequestDTO } from "@dtos/request/SignUp";

export interface AuthPortIn {
  signIn(data: SignInRequestDTO): Promise<void>;
  signUp(data: SignUpRequestDTO): Promise<void>;
}
