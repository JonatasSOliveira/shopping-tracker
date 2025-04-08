import { Required } from "@/decorators/Required";
import { BaseDTO } from "../Base";

interface SignInRequestDTOProps {
  email: string;
  password: string;
}

export class SignInRequestDTO extends BaseDTO<SignInRequestDTOProps> {
  @Required
  public email: string = "";

  @Required
  public password: string = "";

  public updateDataFromObject(data: SignInRequestDTOProps): void {
    this.email = data.email;
    this.password = data.password;
  }
}
