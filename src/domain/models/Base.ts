import { Field } from "@/decorators/database/Field";
import { NotNull } from "@/decorators/database/NotNull";
import { PrimaryKey } from "@/decorators/database/PrimaryKey";

export interface BaseModelFields {
  id: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

export abstract class BaseModel {
  @Field()
  @PrimaryKey()
  protected id: string = "";

  @Field()
  @NotNull()
  protected createdAt: Date = new Date();

  @Field()
  @NotNull()
  protected updatedAt: Date = new Date();

  @Field()
  protected deletedAt: Date | null = null;

  constructor(data: Partial<BaseModelFields>) {
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

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public getDeletedAt(): Date | null {
    return this.deletedAt;
  }
}
