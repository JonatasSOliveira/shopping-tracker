import { BaseModel } from "@/models/Base";

export interface CRUDPortIn<Model extends BaseModel, FormDTO> {
  create(data: FormDTO): Promise<string>;
  listAll(): Promise<Model[]>;
  findById(id: string): Promise<Model>;
  update(data: FormDTO, id: string): Promise<void>;
}
