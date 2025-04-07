import { Retailer } from "@/models/Retailer";
import { Where } from "@/types/repositories/Where";

export interface RetailerRepository {
  create(data: Partial<Retailer>): Promise<string>;
  listAll(): Promise<Retailer[]>;
  update(data: Partial<Retailer>, where: Where<Retailer>): Promise<void>;
}
