import { Field } from "@/decorators/database/Field";

export interface BaseModelFields {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export abstract class BaseModel {
  @Field()
  protected id: string = "";

  @Field()
  protected createdAt: Date = new Date();

  @Field()
  protected updatedAt: Date = new Date();

  @Field()
  protected deletedAt: Date | null = null;

  constructor(data: BaseModelFields) {
    this.id = data.id ?? "";
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
    this.deletedAt = data.deletedAt ?? null;
  }

  public updateCreatedAt(): void {
    this.createdAt = new Date();
  }

  public updateUpdatedAt(): void {
    this.updatedAt = new Date();
  }

  public getId(): string {
    return this.id;
  }
}
