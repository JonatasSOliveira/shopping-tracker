import { Required } from "@decorators/Required"

export class SignUpRequestDTO {
  @Required
  public name: string
  
  @Required
  public email: string
  
  @Required
  public password: string
}