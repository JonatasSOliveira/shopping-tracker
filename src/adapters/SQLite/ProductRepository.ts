import { Product, ProductFields } from "@/models/Product";
import { SQLiteBaseRepositoryAdapter } from "./BaseRepository";
import { ModelMapperPort } from "@/ports/middleware/Mapper";
import { SQLiteQueryExecutor } from "@/infra/SQLite/QueryExecutor";
import { ProductRepository } from "@/ports/out/ProductRepository";

export class SQLiteProductRepositoryAdapter
  extends SQLiteBaseRepositoryAdapter<Product, ProductFields>
  implements ProductRepository
{
  constructor(
    protected sqliteQueryExecutor: SQLiteQueryExecutor,
    protected mapper: ModelMapperPort<Product, ProductFields, any>,
  ) {
    super(sqliteQueryExecutor, mapper, Product);
  }
}
