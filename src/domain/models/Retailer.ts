import { Model } from "@/decorators/database/Model";
import { Field } from "@/decorators/database/Field";
import { BaseModel } from "./Base";

@Model("retailer")
export class Retailer extends BaseModel {
  @Field()
  private name: string = "";
}
