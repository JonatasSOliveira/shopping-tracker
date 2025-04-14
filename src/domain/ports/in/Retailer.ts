import { RetailerFormDTO } from "@/dtos/retailer/request/Form";
import { Retailer } from "@/models/Retailer";

export interface RetailerPortIn {
  create(data: RetailerFormDTO): Promise<string>;
  listAll(): Promise<Retailer[]>;
  findById(id: string): Promise<Retailer>;
  update(data: RetailerFormDTO, id: string): Promise<void>;
}
