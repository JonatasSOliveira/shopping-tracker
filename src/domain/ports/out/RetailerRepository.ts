import { Retailer, RetailerFields } from "@/models/Retailer";
import { Where } from "@/types/repositories/Where";

export interface RetailerRepository {
  create(data: Retailer): Promise<string>;
  listAll(options?: { where?: Where<RetailerFields> }): Promise<Retailer[]>;
  update(data: Retailer, where: Where<RetailerFields>): Promise<void>;
}
