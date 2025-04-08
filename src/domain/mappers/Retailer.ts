import { Retailer, RetailerFields } from "@/models/Retailer";

export class RetailerMapper {
  static fromFields(data: Partial<RetailerFields>): Retailer {
    return new Retailer(data);
  }
}
