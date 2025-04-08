import { RetailerCreateDTO } from "@/dtos/retailer/request/Create";
import { Retailer } from "@/models/Retailer";
import { RetailerPortIn } from "@/ports/in/Retailer";
import { RetailerRepository } from "@/ports/out/RetailerRepository";
import { RetailerMapper } from "domain/mappers/Retailer";
import { Logger, LogLevel } from "./Logger";

export class RetailerService implements RetailerPortIn {
  constructor(private retailerRepository: RetailerRepository) {}

  public async create(data: RetailerCreateDTO): Promise<string> {
    Logger.log(LogLevel.INFO, "[RetailerService] Creating retailer");
    return await this.retailerRepository.create(
      RetailerMapper.fromFields(data),
    );
  }

  public async listAll(): Promise<Retailer[]> {
    Logger.log(LogLevel.INFO, "[RetailerService] Listing retailers");
    return await this.retailerRepository.listAll();
  }
}
