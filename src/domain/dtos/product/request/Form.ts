import { BaseDTO } from "@/dtos/Base";
import { Product, ProductFields } from "@/models/Product";
import { Required } from "@devjonatas/devkit/decorators/validation";

type ProductFormDTOProps = Required<Pick<ProductFields, "name" | "brand">> &
  Pick<ProductFields, "barCode">;

export class ProductFormDTO
  extends BaseDTO<ProductFormDTOProps>
  implements ProductFormDTOProps
{
  @Required
  public name: string = "";

  public barCode: string | null = null;

  @Required
  public brand: string = "";

  constructor() {
    super(Product.prototype);
  }

  updateDataFromObject(data: ProductFormDTOProps): void {
    this.name = data.name ?? "";
    this.barCode = data.barCode;
    this.brand = data.brand ?? "";
  }
}
