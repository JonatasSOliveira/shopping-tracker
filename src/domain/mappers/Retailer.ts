import { RetailerFormDTO } from "@/dtos/retailer/request/Form";
import { Retailer, RetailerFields } from "@/models/Retailer";
import { ModelMapperPort } from "@/ports/middleware/Mapper";
import { capitalizeWords } from "@/utils/string";

export class RetailerMapper
  implements ModelMapperPort<Retailer, RetailerFields, RetailerFormDTO>
{
  public toDTO(retailer: Retailer): RetailerFormDTO {
    const createDTO = new RetailerFormDTO();
    createDTO.updateDataFromObject({ name: retailer.getName() });
    return createDTO;
  }

  public fromDTO(data: RetailerFormDTO): Retailer {
    return new Retailer({
      ...data,
      address: data.address ? capitalizeWords(data.address) : undefined,
      city: data.city ? capitalizeWords(data.city) : undefined,
      name: data.name ? capitalizeWords(data.name) : undefined,
      stateUf: data.stateUf ? capitalizeWords(data.stateUf) : undefined,
    });
  }

  public fromFields(data: RetailerFields): Retailer {
    return new Retailer({
      ...data,
      address: data.address ? capitalizeWords(data.address) : undefined,
      city: data.city ? capitalizeWords(data.city) : undefined,
      name: data.name ? capitalizeWords(data.name) : undefined,
      stateUf: data.stateUf ? capitalizeWords(data.stateUf) : undefined,
    });
  }

  public toFields(model: Retailer): RetailerFields {
    return {
      id: model.getId(),
      name: model.getName(),
      address: model.getAddress(),
      city: model.getCity(),
      stateUf: model.getStateUf(),
      latitude: model.getLatitude(),
      longitute: model.getLongitute(),
      approvalStatus: model.getApprovalStatus(),
      approvedAt: model.getApprovedAt(),
      approvedByUserId: model.getApprovedByUserId(),
      createdByUserId: model.getCreatedByUserId(),
      deletedByUserId: model.getDeletedByUserId(),
      updatedByUserId: model.getUpdatedByUserId(),
      createdAt: model.getCreatedAt(),
      deletedAt: model.getDeletedAt(),
      updatedAt: model.getUpdatedAt(),
    };
  }
}
