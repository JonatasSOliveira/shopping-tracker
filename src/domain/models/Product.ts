import { Model } from "@/decorators/database/Model";
import { BaseModel, BaseModelFields } from "./Base";
import { Field } from "@/decorators/database/Field";
import { NotNull } from "@/decorators/database/NotNull";
import { Label } from "@/decorators/presentation/Label";

export interface ProductFields extends BaseModelFields {
  name?: string;
  barCode?: string;
  brand?: string;
  imageUrl?: string;
}

@Model("product")
export class Product extends BaseModel {
  @Field()
  @NotNull()
  @Label("Nome")
  private name: string;

  @Field()
  @Label("Código de barras")
  private barCode?: string;

  @Field()
  @Label("Marca")
  private brand?: string;

  @Field()
  @Label("URL de imagem")
  private imageUrl?: string;

  constructor(data: ProductFields) {
    super(data);
    this.name = data.name ?? "";
    this.barCode = data.barCode;
    this.brand = data.brand;
    this.imageUrl = data.imageUrl;
  }

  public getName = () => this.name;
  public getBarCode = () => this.barCode;
  public getBrand = () => this.brand;
  public getImageUrl = () => this.imageUrl;
}
