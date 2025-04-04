export class BaseModel {
  protected id: string = "";
  protected createdAt: Date = new Date();
  protected updatedAt: Date = new Date();
  protected deletedAt: Date | null = null;
}
