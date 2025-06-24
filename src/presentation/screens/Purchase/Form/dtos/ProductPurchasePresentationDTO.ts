import { BaseDTO } from "@/dtos/Base";
import { ProductFields } from "@/models/Product";
import { PurchaseProductFields } from "@/models/PurchaseProduct";
import { formatCurrency } from "@devjonatas/devkit/utils";
import { Readonly } from "@devjonatas/devkit/decorators/presentation";

export type ProductPurchasePresentationDTOProps = {
  name: NonNullable<ProductFields["name"]>;
} & Required<
  Pick<PurchaseProductFields, "quantity" | "unitPrice" | "isOnSale">
>;

export class ProductPurchasePresentationDTO
  extends BaseDTO<ProductPurchasePresentationDTOProps>
  implements ProductPurchasePresentationDTOProps
{
  @Readonly
  readonly name: string;
  quantity: number;
  unitPrice: number;
  isOnSale: boolean;

  constructor(props?: ProductPurchasePresentationDTOProps) {
    super();
    this.name = props?.name || "";
    this.quantity = props?.quantity || 0;
    this.unitPrice = props?.unitPrice || 0;
    this.isOnSale = props?.isOnSale || false;
  }

  public updateDataFromObject(data: ProductPurchasePresentationDTOProps): void {
    this.quantity = Number(data.quantity);
    this.unitPrice = Number(data.unitPrice); //TODO: Remove conversion from here
    this.isOnSale = data.isOnSale;
  }

  public getTotalPrice(): number {
    return this.quantity * this.unitPrice;
  }

  public getFormatedUnitPrice(): string {
    return formatCurrency(this.unitPrice);
  }

  public getFormatedTotalPrice(): string {
    return formatCurrency(this.unitPrice * this.quantity);
  }
}
