import { BaseModel, BaseModelFields } from "@/models/Base";
import { Where } from "@/types/repositories/Where";

export interface BaseRepository<
  Model extends BaseModel,
  ModelFields extends BaseModelFields,
> {
  create(data: Model): Promise<string>;
  listAll(options?: { where?: Where<ModelFields> }): Promise<Model[]>;
  update(data: Model, where: Where<ModelFields>): Promise<void>;
}
