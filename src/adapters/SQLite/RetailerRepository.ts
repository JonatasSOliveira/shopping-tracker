import { SQLiteQueryExecutor } from "@/infra/SQLite/QueryExecutor";
import { Retailer, RetailerFields } from "@/models/Retailer";
import { RetailerRepository } from "@/ports/out/RetailerRepository";
import { SQLiteBaseRepositoryAdapter } from "./BaseRepository";
import { RetailerFormDTO } from "@/dtos/retailer/request/Form";
import { ModelMapperPort } from "@devjonatas/devkit/ports/middleware";

export class SQLiteRetailerRepositoryAdapter
  extends SQLiteBaseRepositoryAdapter<Retailer, RetailerFields>
  implements RetailerRepository
{
  constructor(
    protected sqliteQueryExecutor: SQLiteQueryExecutor,
    protected mapper: ModelMapperPort<
      Retailer,
      RetailerFields,
      RetailerFormDTO
    >,
  ) {
    super(sqliteQueryExecutor, mapper, Retailer);
  }
}
