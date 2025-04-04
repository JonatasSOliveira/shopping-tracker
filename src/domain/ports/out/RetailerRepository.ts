import { Retailer } from "@/models/Retailer";

export interface RetailerRepository {
  create(data: Retailer): Promise<string>;
}
