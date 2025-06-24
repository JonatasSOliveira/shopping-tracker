import { BaseDTO } from "@/dtos/Base";
import { Label, Secret } from "@devjonatas/devkit/decorators/presentation";
import { Required } from "@devjonatas/devkit/decorators/validation";

export interface SignUpRequestDTOProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export class SignUpRequestDTO extends BaseDTO<SignUpRequestDTOProps> {
  @Required
  @Label("Nome")
  public name: string = "";

  @Required
  @Label("E-mail")
  public email: string = "";

  @Required
  @Secret
  @Label("Senha")
  public password: string = "";

  @Required
  @Secret
  @Label("Confirmar Senha")
  public confirmPassword: string = "";

  public updateDataFromObject(data: SignUpRequestDTOProps): void {
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.confirmPassword = data.confirmPassword;
  }
}
