import { SQLiteQueryExecutor } from "@/infra/SQLite/QueryExecutor";
import { BaseModel, BaseModelFields } from "@devjonatas/devkit/models";
import { BaseRepository } from "@devjonatas/devkit/ports/out";
import { Where } from "@devjonatas/devkit/types";
import { Logger, LogLevel } from "@/services/Logger";
import { ModelMapperPort } from "@devjonatas/devkit/ports/middleware";
import { getTableName } from "@devjonatas/devkit/decorators/database";

export class SQLiteBaseRepositoryAdapter<
  Model extends BaseModel,
  Fields extends BaseModelFields,
> implements BaseRepository<Model, Fields>
{
  constructor(
    protected sqliteQueryExecutor: SQLiteQueryExecutor,
    protected mapper: ModelMapperPort<Model, Fields, any>,
    protected modelClass: new (data: Fields) => Model,
  ) {}

  public async create(data: Model): Promise<string> {
    Logger.log(
      LogLevel.INFO,
      `[SQLiteRepository] Creating ${this.modelClass.name}`,
    );
    const id = await this.sqliteQueryExecutor.insert<Model>(
      getTableName(this.modelClass),
      data,
    );
    Logger.log(
      LogLevel.INFO,
      `[SQLiteRepository] ${this.modelClass.name} created with id ${id}`,
    );
    return id;
  }

  public async listAll(options?: { where?: Where<Fields> }): Promise<Model[]> {
    Logger.log(
      LogLevel.INFO,
      `[SQLiteRepository] Listing all ${this.modelClass.name} with options ` +
        JSON.stringify(options),
    );

    const results = await this.sqliteQueryExecutor.select<Fields>(
      getTableName(this.modelClass),
      options?.where,
    );

    Logger.log(
      LogLevel.INFO,
      `[SQLiteRepository] Found ${results.length} ${this.modelClass.name}`,
    );

    return results.map(this.mapper.fromFields);
  }

  public async update(data: Model, where: Where<Fields>): Promise<void> {
    await this.sqliteQueryExecutor.update<Model, Fields>(
      getTableName(this.modelClass),
      data,
      where,
    );
  }
}
