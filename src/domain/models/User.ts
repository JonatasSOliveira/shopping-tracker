import { Model } from "@/decorators/database/Model";

@Model("user")
export class User {
  public name: string = "";
  public email: string = "";
  public password: string = "";
}
