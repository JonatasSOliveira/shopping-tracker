import { Field } from "@/decorators/database/Field";
import { BaseModel, BaseModelFields } from "./Base";
import { NotNull } from "@/decorators/database/NotNull";
import { Label } from "@/decorators/presentation/Label";
import { Model } from "@/decorators/database/Model";

export interface UserFields extends BaseModelFields {
  name?: string;
  email?: string;
}

@Model("user")
export class User extends BaseModel {
  @Field()
  @NotNull()
  @Label("Nome")
  private name: string;

  @Field()
  @NotNull()
  @Label("E-mail")
  private email: string;

  constructor(data: UserFields) {
    super(data);
    this.name = data.name ?? "";
    this.email = data.email ?? "";
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }
}
