import { SignInRequestDTO } from "@/dtos/request/SignIn";
import { SignUpRequestDTO } from "@/dtos/request/SignUp";
import { AuthPortIn } from "@/ports/in/Auth";
import { DTOValidatorMiddlewarePort } from "@/ports/middleware/DTOValidator";
import { UserRepository } from "@/ports/out/UserRepository";

export class AuthService implements AuthPortIn {
  constructor(
    private userRepository: UserRepository,
    private dtoValidator: DTOValidatorMiddlewarePort,
  ) {}

  public async signIn(data: SignInRequestDTO): Promise<void> {
    this.dtoValidator.validate(data);
    await this.userRepository.listOne({
      where: { email: data.email, password: data.password },
    });
  }

  public async signUp(data: SignUpRequestDTO): Promise<void> {
    this.dtoValidator.validate(data);
    await this.userRepository.create(data);
  }
}
