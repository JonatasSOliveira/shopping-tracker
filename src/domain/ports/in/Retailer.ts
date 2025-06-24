import { RetailerFormDTO } from "@/dtos/retailer/request/Form";
import { Retailer } from "@/models/Retailer";
import { CRUDPortIn } from "./CRUD";

export interface RetailerPortIn extends CRUDPortIn<Retailer, RetailerFormDTO> {
  listByName(name: string): Promise<Retailer[]>;
}
