import { getTableName } from "@/decorators/database/Model";
import { SQLiteQueryExecutor } from "@/infra/SQLite/QueryExecutor";
import { Retailer } from "@/models/Retailer";
import { RetailerRepository } from "@/ports/out/RetailerRepository";
import { Where } from "@/types/repositories/Where";

export class SQLiteRetailerRepositoryAdapter implements RetailerRepository {
  constructor(private sqliteQueryExecutor: SQLiteQueryExecutor) {}

  public async create(data: Partial<Retailer>): Promise<string> {
    const id = await this.sqliteQueryExecutor.insert<Retailer>(
      getTableName(Retailer),
      data,
    );

    return id.toString();
  }

  public async listAll(): Promise<Retailer[]> {
    return await this.sqliteQueryExecutor.select<Retailer>(
      getTableName(Retailer),
    );
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
