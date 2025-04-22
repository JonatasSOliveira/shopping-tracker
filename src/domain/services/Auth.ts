import { SignInRequestDTO } from "@/dtos/auth/request/SignIn";
import { SignUpRequestDTO } from "@/dtos/auth/request/SignUp";
import { User, UserFields } from "@/models/User";
import { AuthPortIn } from "@/ports/in/Auth";
import { ModelMapperPort } from "@/ports/middleware/Mapper";
import { AuthManagerPortOut } from "@/ports/out/AuthManager";
import { SessionStoragePortOut } from "@/ports/out/SessionStorage";
import { UserRepository } from "@/ports/out/UserRepository";

export class AuthService implements AuthPortIn {
  constructor(
    private authAdapter: AuthManagerPortOut,
    private userRepository: UserRepository,
    private userMapper: ModelMapperPort<User, UserFields, any>,
    private sessionStorage: SessionStoragePortOut,
  ) {}

  public async signIn(data: SignInRequestDTO): Promise<void> {
    const { id } = await this.authAdapter.signIn(data);
    const [user] = await this.userRepository.listAll({ where: { id } });
    await this.sessionStorage.save({
      name: user.getName(),
      email: user.getEmail(),
    });
  }

  public async signUp(data: SignUpRequestDTO): Promise<void> {
    const { id } = await this.authAdapter.signUp(data);
    const user = this.userMapper.fromFields({ ...data, id });
    await this.userRepository.create(user);
    await this.sessionStorage.save({
      name: user.getName(),
      email: user.getEmail(),
    });
  }
}
