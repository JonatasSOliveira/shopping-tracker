import { SQLiteQueryExecutor } from "@/infra/SQLite/QueryExecutor";
import { Retailer } from "@/models/Retailer";
import { RetailerRepository } from "@/ports/out/RetailerRepository";

export class SQLiteRetailerRepositoryAdapter implements RetailerRepository {
  private sqliteQueryExecutor: SQLiteQueryExecutor = new SQLiteQueryExecutor();

  public async create(data: Retailer): Promise<string> {
    const id = await this.sqliteQueryExecutor.insert<Retailer>(
      "retailer",
      data,
    );

    return id.toString();
  }
}
