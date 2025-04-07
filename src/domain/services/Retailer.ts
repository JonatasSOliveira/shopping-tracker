import { RetailerCreateDTO } from "@/dtos/retailer/request/Create";
import { Retailer } from "@/models/Retailer";
import { RetailerPortIn } from "@/ports/in/Retailer";
import { RetailerRepository } from "@/ports/out/RetailerRepository";

export class RetailerService implements RetailerPortIn {
  constructor(private retailerRepository: RetailerRepository) {}

  public async create(data: RetailerCreateDTO): Promise<string> {
    return await this.retailerRepository.create(data);
  }

  public async listAll(): Promise<Retailer[]> {
    return await this.retailerRepository.listAll();
  }
}
