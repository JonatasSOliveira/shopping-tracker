import { Email, Required } from "@devjonatas/devkit/decorators/validation";
import { BaseDTO } from "@/dtos/Base";
import { Label, Secret } from "@devjonatas/devkit/decorators/presentation";

interface SignInRequestDTOProps {
  email: string;
  password: string;
}

export class SignInRequestDTO extends BaseDTO<SignInRequestDTOProps> {
  @Required
  @Email
  @Label("E-mail")
  public email: string = "";

  @Required
  @Secret
  @Label("Senha")
  public password: string = "";

  public updateDataFromObject(data: SignInRequestDTOProps): void {
    this.email = data.email;
    this.password = data.password;
  }
}
