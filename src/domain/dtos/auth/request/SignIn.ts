import { Label } from "@/decorators/presentation/Label";
import { Secret } from "@/decorators/presentation/Secret";
import { Email } from "@/decorators/validation/Email";
import { Required } from "@/decorators/validation/Required";
import { BaseDTO } from "@/dtos/Base";

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
