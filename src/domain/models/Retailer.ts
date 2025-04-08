import { Model } from "@/decorators/database/Model";
import { Field } from "@/decorators/database/Field";
import { BaseModel, BaseModelFields } from "./Base";
import { Label } from "@/decorators/presentation/Label";

export interface RetailerFields extends BaseModelFields {
  name?: string;
}

@Model("retailer")
export class Retailer extends BaseModel {
  @Field()
  @Label("Nome")
  private name: string;

  constructor(data: RetailerFields) {
    super(data);
    this.name = data.name ?? "";
  }

  public getName(): string {
    return this.name;
  }
}
