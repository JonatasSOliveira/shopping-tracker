import { Field } from "@/decorators/database/Field";
import { BaseModel, BaseModelFields } from "./Base";
import { NotNull } from "@/decorators/database/NotNull";
import { ForeignKey } from "@/decorators/database/ForeignKey";
import { User } from "./User";

export interface UserTrackedModelFields extends BaseModelFields {
  createdByUserId: string | null;
  updatedByUserId: string | null;
  deletedByUserId: string | null;
}

export abstract class UserTrackedModel extends BaseModel {
  @Field()
  @NotNull()
  @ForeignKey(() => User)
  protected createdByUserId: string;

  @Field()
  @NotNull()
  @ForeignKey(() => User)
  protected updatedByUserId: string;

  @Field()
  @ForeignKey(() => User)
  protected deletedByUserId: string | null;

  constructor(data: Partial<UserTrackedModelFields>) {
    super(data);
    this.createdByUserId = data.createdByUserId ?? "";
    this.updatedByUserId = data.updatedByUserId ?? "";
    this.deletedByUserId = data.deletedByUserId ?? null;
  }

  public getCreatedByUserId(): string {
    return this.createdByUserId;
  }

  public getUpdatedByUserId(): string {
    return this.updatedByUserId;
  }

  public getDeletedByUserId(): string | null {
    return this.deletedByUserId;
  }
}
