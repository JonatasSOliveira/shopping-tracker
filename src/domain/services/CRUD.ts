import { v4 as uuidv4 } from "uuid";
import { BaseModel, BaseModelFields } from "@/models/Base";
import { CRUDPortIn } from "@/ports/in/CRUD";
import { ModelMapperPort } from "@/ports/middleware/Mapper";
import { BaseRepository } from "@/ports/out/BaseRepository";
import { Where } from "@/types/repositories/Where";
import { Logger, LogLevel } from "./Logger";
import { SessionStoragePortOut } from "@/ports/out/SessionStorage";

export abstract class CRUDService<
  Model extends BaseModel,
  ModelFields extends BaseModelFields,
  FormDTO,
> implements CRUDPortIn<Model, FormDTO>
{
  constructor(
    protected repository: BaseRepository<Model, ModelFields>,
    protected mapper: ModelMapperPort<Model, ModelFields, FormDTO>,
    protected sessionStorage: SessionStoragePortOut,
  ) {}

  protected log(level: LogLevel, message: string, error?: unknown) {
    Logger.log(level, `[${this.constructor.name}] ${message}`, error);
  }

  public async create(data: FormDTO): Promise<string> {
    try {
      this.log(LogLevel.DEBUG, `Starting creation process`);
      const id = uuidv4();
      this.log(LogLevel.DEBUG, `Generated ID: ${id}`);
      const session = await this.sessionStorage.get();
      const userId = session.id;
      const fields: ModelFields = {
        id,
        createdByUserId: userId,
        updatedByUserId: userId,
        ...(data as unknown as ModelFields),
      };
      const dataId = await this.repository.create(
        this.mapper.fromFields(fields),
      );
      this.log(LogLevel.INFO, `Created successfully (id: ${dataId})`);
      return dataId;
    } catch (error) {
      this.log(LogLevel.ERROR, `Error during creation`, error);
      throw error;
    }
  }

  public async listAll(): Promise<Model[]> {
    try {
      this.log(LogLevel.INFO, `Retrieving all entries`);
      return await this.repository.listAll();
    } catch (error) {
      this.log(LogLevel.ERROR, `Error retrieving all entries`, error);
      throw error;
    }
  }

  public async findById(id: string): Promise<Model> {
    try {
      this.log(LogLevel.DEBUG, `Searching for entry by ID (id: ${id})`);
      const results = await this.repository.listAll({
        where: { id } as Where<ModelFields>,
      });
      const found = results[0];
      if (found) {
        this.log(LogLevel.INFO, `Entry found (id: ${id})`);
      } else {
        this.log(LogLevel.INFO, `No entry found (id: ${id})`);
      }
      return found;
    } catch (error) {
      this.log(LogLevel.ERROR, `Error finding entry by ID (id: ${id})`, error);
      throw error;
    }
  }

  public async update(data: FormDTO, id: string): Promise<void> {
    try {
      this.log(LogLevel.DEBUG, `Updating entry (id: ${id})`);
      const session = await this.sessionStorage.get();
      const userId = session.id;
      const fields: ModelFields = {
        updatedByUserId: userId,
        ...(data as unknown as ModelFields),
      };
      const where: Where<ModelFields> = { id } as Where<ModelFields>;
      await this.repository.update(this.mapper.fromFields(fields), where);
      this.log(LogLevel.INFO, `Entry updated successfully (id: ${id})`);
    } catch (error) {
      this.log(LogLevel.ERROR, `Error updating entry (id: ${id})`, error);
      throw error;
    }
  }
}
