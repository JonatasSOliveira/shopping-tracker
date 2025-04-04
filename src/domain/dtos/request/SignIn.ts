import { Required } from "@/decorators/Required";

export class SignInRequestDTO {
  @Required
  public email: string = "";

  @Required
  public password: string = "";
}
