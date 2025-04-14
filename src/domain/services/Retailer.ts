import { v4 as uuidv4 } from "uuid";
import { RetailerFormDTO } from "@/dtos/retailer/request/Form";
import { Retailer } from "@/models/Retailer";
import { RetailerPortIn } from "@/ports/in/Retailer";
import { RetailerRepository } from "@/ports/out/RetailerRepository";
import { RetailerMapper } from "domain/mappers/Retailer";
import { Logger, LogLevel } from "./Logger";

export class RetailerService implements RetailerPortIn {
  constructor(private retailerRepository: RetailerRepository) {}

  public async create(data: RetailerFormDTO): Promise<string> {
    try {
      Logger.log(
        LogLevel.DEBUG,
        `[RetailerService] Starting retailer creation process`,
      );
      const id = uuidv4();
      Logger.log(LogLevel.DEBUG, `[RetailerService] Generated ID: ${id}`);
      const retailerId = await this.retailerRepository.create(
        RetailerMapper.fromFields({ id, ...data }),
      );
      Logger.log(
        LogLevel.INFO,
        `[RetailerService] Retailer created successfully (id: ${retailerId})`,
      );
      return retailerId;
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        `[RetailerService] Error creating retailer`,
        error,
      );
      throw error;
    }
  }

  public async listAll(): Promise<Retailer[]> {
    try {
      Logger.log(LogLevel.INFO, `[RetailerService] Retrieving all retailers`);
      return await this.retailerRepository.listAll();
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        `[RetailerService] Error retrieving all retailers`,
        error,
      );
      throw error;
    }
  }

  public async findById(id: string): Promise<Retailer> {
    try {
      Logger.log(
        LogLevel.DEBUG,
        `[RetailerService] Searching for retailer by ID (id: ${id})`,
      );
      const results = await this.retailerRepository.listAll({
        where: { id },
      });

      return results[0];
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        `[RetailerService] Error finding retailer by ID (id: ${id})`,
        error,
      );
      throw error;
    }
  }

  public async update(data: RetailerFormDTO, id: string): Promise<void> {
    try {
      Logger.log(
        LogLevel.DEBUG,
        `[RetailerService] Updating retailer (id: ${id})`,
      );
      await this.retailerRepository.update(RetailerMapper.fromFields(data), {
        id,
      });
      Logger.log(
        LogLevel.INFO,
        `[RetailerService] Retailer updated successfully (id: ${id})`,
      );
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        `[RetailerService] Error updating retailer (id: ${id})`,
        error,
      );
      throw error;
    }
  }
}
