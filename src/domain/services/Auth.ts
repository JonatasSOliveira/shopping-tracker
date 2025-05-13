import { SignInRequestDTO } from "@/dtos/auth/request/SignIn";
import { SignUpRequestDTO } from "@/dtos/auth/request/SignUp";
import { UserSessionDTO } from "@/dtos/user/Session";
import { AuthPortIn } from "@/ports/in/Auth";
import { UserMapperPort } from "@/ports/middleware/UserMapper";
import { AuthManagerPortOut } from "@/ports/out/AuthManager";
import { SessionStoragePortOut } from "@/ports/out/SessionStorage";
import { UserRepository } from "@/ports/out/UserRepository";

export class AuthService implements AuthPortIn {
  constructor(
    private authAdapter: AuthManagerPortOut,
    private userRepository: UserRepository,
    private userMapper: UserMapperPort,
    private sessionStorage: SessionStoragePortOut,
  ) {}

  public async signIn(data: SignInRequestDTO): Promise<void> {
    const { id } = await this.authAdapter.signIn(data);
    const [user] = await this.userRepository.listAll({ where: { id } });
    await this.sessionStorage.save({
      id,
      name: user.getName(),
      email: user.getEmail(),
    });
  }

  public async signUp(data: SignUpRequestDTO): Promise<void> {
    const { id } = await this.authAdapter.signUp(data);
    const user = this.userMapper.fromSignUpRequestDTOWithId({ ...data, id });
    await this.userRepository.create(user);
    await this.sessionStorage.save({
      id,
      name: user.getName(),
      email: user.getEmail(),
    });
  }

  public async getSession(): Promise<UserSessionDTO | null> {
    return await this.sessionStorage.get();
  }

  public async signOut(): Promise<void> {
    const session = await this.sessionStorage.get();
    if (!session) {
      return;
    }
    await this.authAdapter.signOut(session);
    await this.sessionStorage.remove();
  }
}
