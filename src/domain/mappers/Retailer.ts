import { RetailerFormDTO } from "@/dtos/retailer/request/Form";
import { Retailer, RetailerFields } from "@/models/Retailer";

export class RetailerMapper {
  static fromFields(data: Partial<RetailerFields>): Retailer {
    return new Retailer(data);
  }

  static toCreateDTO(retailer: Retailer) {
    const createDTO = new RetailerFormDTO();
    createDTO.updateDataFromObject({ name: retailer.getName() });
    return createDTO;
  }
}
