import { Required } from "@/decorators/Required";
import { BaseDTO } from "@/dtos/Base";
import { Retailer } from "@/models/Retailer";

interface RetailerFormDTOProps {
  name: string;
}

export class RetailerFormDTO extends BaseDTO<RetailerFormDTOProps> {
  @Required
  public name: string = "";

  constructor() {
    super(Retailer.prototype);
  }

  public override updateDataFromObject(data: RetailerFormDTOProps): void {
    this.name = data.name;
  }
}
