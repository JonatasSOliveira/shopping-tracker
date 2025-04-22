import { Required } from "@/decorators/Required";
import { BaseDTO } from "@/dtos/Base";
import { Retailer, RetailerFields } from "@/models/Retailer";

type RetailerFormDTOProps = Required<Pick<RetailerFields, "name">>;

export class RetailerFormDTO
  extends BaseDTO<RetailerFormDTOProps>
  implements RetailerFormDTOProps
{
  @Required
  public name: string = "";

  constructor() {
    super(Retailer.prototype);
  }

  public override updateDataFromObject(data: RetailerFormDTOProps): void {
    this.name = data.name;
  }
}
