import { Field } from "@/decorators/database/Field";

export class BaseModel {
  @Field()
  protected id: string = "";

  @Field()
  protected createdAt: Date = new Date();

  @Field()
  protected updatedAt: Date = new Date();

  @Field()
  protected deletedAt: Date | null = null;
}
