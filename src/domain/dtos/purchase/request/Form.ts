import { Required } from "@/decorators/Required";
import { BaseDTO } from "@/dtos/Base";
import { Purchase, PurchaseFields } from "@/models/Purchase";

type PurchaseFormDTOProps = Required<Pick<PurchaseFields, "retailerId" | "total" | "date">>;

export class PurchaseFormDTO extends BaseDTO<PurchaseFormDTOProps> implements PurchaseFormDTOProps {
  @Required
  public retailerId: number = 0;

  @Required
  public total: number = 0;

  @Required
  public date: Date = new Date();

  constructor() {
    super(Purchase.prototype);
  }

  public override updateDataFromObject(data: PurchaseFormDTOProps): void {
    this.retailerId = data.retailerId;
    this.total = data.total;
    this.date = data.date;
  }
}