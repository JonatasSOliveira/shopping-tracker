import { Model } from "@/decorators/database/Model";
import { BaseModel } from "./Base";

@Model("retailer")
export class Retailer extends BaseModel {
  private name: string = "";
}
