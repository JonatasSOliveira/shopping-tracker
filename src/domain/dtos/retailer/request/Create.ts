import { Required } from "@/decorators/Required";
import { BaseDTO } from "@/dtos/Base";
import { Retailer } from "@/models/Retailer";

interface RetailerCreateDTOProps {
  name: string;
}

export class RetailerCreateDTO extends BaseDTO<RetailerCreateDTOProps> {
  @Required
  public name: string = "";

  constructor() {
    super(Retailer.prototype);
  }

  public override updateDataFromObject(data: RetailerCreateDTOProps): void {
    this.name = data.name;
  }
}
