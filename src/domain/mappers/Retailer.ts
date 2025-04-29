import { RetailerFormDTO } from "@/dtos/retailer/request/Form";
import { Retailer, RetailerFields } from "@/models/Retailer";
import { ModelMapperPort } from "@/ports/middleware/Mapper";

export class RetailerMapper
  implements ModelMapperPort<Retailer, RetailerFields, RetailerFormDTO>
{
  public toDTO(retailer: Retailer): RetailerFormDTO {
    const createDTO = new RetailerFormDTO();
    createDTO.updateDataFromObject({ name: retailer.getName() });
    return createDTO;
  }

  public fromDTO(data: RetailerFormDTO): Retailer {
    return new Retailer(data);
  }

  public fromFields(data: RetailerFields): Retailer {
    return new Retailer(data);
  }

  public toFields(model: Retailer): RetailerFields {
    return {
      name: model.getName(),
      address: model.getAddress(),
      city: model.getCity(),
      stateUf: model.getStateUf(),
      latitude: model.getLatitude(),
      longitute: model.getLongitute(),
    };
  }
}
