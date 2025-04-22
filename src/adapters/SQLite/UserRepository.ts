import { SQLiteQueryExecutor } from "@/infra/SQLite/QueryExecutor";
import { User, UserFields } from "@/models/User";
import { UserRepository } from "@/ports/out/UserRepository";
import { SQLiteBaseRepositoryAdapter } from "./BaseRepository";
import { ModelMapperPort } from "@/ports/middleware/Mapper";

export class SQLiteUserRepositoryAdapter
  extends SQLiteBaseRepositoryAdapter<User, UserFields>
  implements UserRepository
{
  constructor(
    protected sqliteQueryExecutor: SQLiteQueryExecutor,
    protected mapper: ModelMapperPort<User, UserFields, any>,
  ) {
    super(sqliteQueryExecutor, mapper, User);
  }
}
