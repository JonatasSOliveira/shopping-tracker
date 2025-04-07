import { RetailerCreateDTO } from "@/dtos/retailer/request/Create";
import { Retailer } from "@/models/Retailer";

export interface RetailerPortIn {
  create(data: RetailerCreateDTO): Promise<string>;
  listAll(): Promise<Retailer[]>;
}
