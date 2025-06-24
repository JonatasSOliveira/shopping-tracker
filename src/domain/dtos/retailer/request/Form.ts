import { BaseDTO } from "@/dtos/Base";
import { Retailer, RetailerFields } from "@/models/Retailer";
import { Required } from "@devjonatas/devkit/decorators/validation";

type RetailerFormDTOProps = Required<Pick<RetailerFields, "name">> &
  Pick<RetailerFields, "address" | "city" | "stateUf">;

export class RetailerFormDTO
  extends BaseDTO<RetailerFormDTOProps>
  implements RetailerFormDTOProps
{
  @Required
  public name: string = "";
  public address?: string | undefined;
  public city?: string | undefined;
  public stateUf?: string | undefined;

  constructor() {
    super(Retailer.prototype);
  }

  public override updateDataFromObject(data: RetailerFormDTOProps): void {
    this.name = data.name;
    this.address = data.address;
    this.city = data.city;
    this.stateUf = data.stateUf;
  }
}
