import { Model } from "@/decorators/database/Model";
import { Field } from "@/decorators/database/Field";
import { NotNull } from "@/decorators/database/NotNull";
import { Label } from "@/decorators/presentation/Label";
import { ApprovableModel, ApprovableModelFields } from "./ApprovableModel";

export interface ProductFields extends ApprovableModelFields {
  name: string | null;
  barCode: string | null;
  brand: string | null;
  imageUrl: string | null;
}

@Model("product")
export class Product extends ApprovableModel {
  @Field()
  @NotNull()
  @Label("Nome")
  private name: string;

  @Field()
  @Label("Código de barras")
  private barCode: string | null;

  @Field()
  @Label("Marca")
  private brand: string | null;

  @Field()
  @Label("URL de imagem")
  private imageUrl: string | null;

  constructor(data: Partial<ProductFields>) {
    super(data);
    this.name = data.name ?? "";
    this.barCode = data.barCode ?? null;
    this.brand = data.brand ?? null;
    this.imageUrl = data.imageUrl ?? null;
  }

  public getName() {
    return this.name;
  }
  public getBarCode() {
    return this.barCode;
  }
  public getBrand() {
    return this.brand;
  }
  public getImageUrl() {
    return this.imageUrl;
  }
}
