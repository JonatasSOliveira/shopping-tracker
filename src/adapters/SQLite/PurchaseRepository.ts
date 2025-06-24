import { Purchase, PurchaseFields } from "@/models/Purchase";
import { SQLiteBaseRepositoryAdapter } from "./BaseRepository";
import { ModelMapperPort } from "@devjonatas/devkit/ports/middleware";
import { SQLiteQueryExecutor } from "@/infra/SQLite/QueryExecutor";
import { PurchaseRepository } from "@/ports/out/PurchaseRepository";

export class SQLitePurchaseRepositoryAdapter
  extends SQLiteBaseRepositoryAdapter<Purchase, PurchaseFields>
  implements PurchaseRepository
{
  constructor(
    protected sqliteQueryExecutor: SQLiteQueryExecutor,
    protected mapper: ModelMapperPort<Purchase, PurchaseFields, any>,
  ) {
    super(sqliteQueryExecutor, mapper, Purchase);
  }
}
