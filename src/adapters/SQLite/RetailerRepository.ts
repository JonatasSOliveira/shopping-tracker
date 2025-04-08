import { getTableName } from "@/decorators/database/Model";
import { SQLiteQueryExecutor } from "@/infra/SQLite/QueryExecutor";
import { Retailer, RetailerFields } from "@/models/Retailer";
import { RetailerRepository } from "@/ports/out/RetailerRepository";
import { Logger, LogLevel } from "@/services/Logger";
import { Where } from "@/types/repositories/Where";
import { RetailerMapper } from "domain/mappers/Retailer";

export class SQLiteRetailerRepositoryAdapter implements RetailerRepository {
  constructor(private sqliteQueryExecutor: SQLiteQueryExecutor) {}

  public async create(data: Partial<Retailer>): Promise<string> {
    Logger.log(LogLevel.INFO, "[SQLiteRetailerRepository] Creating retailer");
    const id = await this.sqliteQueryExecutor.insert<Retailer>(
      getTableName(Retailer),
      data,
    );

    Logger.log(
      LogLevel.INFO,
      `[SQLiteRetailerRepository] Retailer created with id ${id}`,
    );

    return id.toString();
  }

  public async listAll(): Promise<Retailer[]> {
    Logger.log(
      LogLevel.INFO,
      "[SQLiteRetailerRepository] Listing all retailers",
    );
    const results = await this.sqliteQueryExecutor.select<RetailerFields>(
      getTableName(Retailer),
    );

    Logger.log(
      LogLevel.INFO,
      `[SQLiteRetailerRepository] Found ${results.length} retailers`,
    );

    return results.map(RetailerMapper.fromFields);
  }

  public async update(
    data: Partial<Retailer>,
    where: Where<Retailer>,
  ): Promise<void> {
    await this.sqliteQueryExecutor.update<Retailer>(
      getTableName(Retailer),
      data,
      where,
    );
  }
}
