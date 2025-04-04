import { RetailerCreateDTO } from "@/dtos/retailer/request/Create";

export interface RetailerPortIn {
  create(data: RetailerCreateDTO): Promise<string>;
}
