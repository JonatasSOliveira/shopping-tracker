import { Required } from "@/decorators/Required";
import { BaseDTO } from "@/dtos/Base";
import { Product, ProductFields } from "@/models/Product";

type ProductFormDTOProps = Required<Pick<ProductFields, "name" | "brand">> &
  Pick<ProductFields, "barCode">;

export class ProductFormDTO
  extends BaseDTO<ProductFormDTOProps>
  implements ProductFormDTOProps
{
  @Required
  public name: string = "";

  public barCode?: string;

  @Required
  public brand: string = "";

  constructor() {
    super(Product.prototype);
  }

  updateDataFromObject(data: ProductFormDTOProps): void {
    this.name = data.name;
    this.barCode = data.barCode;
    this.brand = data.brand;
  }
}
