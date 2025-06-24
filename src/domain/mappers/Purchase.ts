import { PurchaseFormDTO } from "@/dtos/purchase/request/Form";
import { Purchase, PurchaseFields } from "@/models/Purchase";
import { ModelMapperPort } from "@devjonatas/devkit/ports/middleware";

export class PurchaseMapper
  implements ModelMapperPort<Purchase, PurchaseFields, PurchaseFormDTO>
{
  public toDTO(purchase: Purchase): PurchaseFormDTO {
    const createDTO = new PurchaseFormDTO();
    createDTO.updateDataFromObject({
      retailerId: purchase.getRetailerId(),
      total: purchase.getTotal(),
      date: purchase.getDate(),
    });
    return createDTO;
  }

  public fromDTO(data: PurchaseFormDTO): Purchase {
    return new Purchase(data);
  }

  public fromFields(data: PurchaseFields): Purchase {
    return new Purchase(data);
  }

  public toFields(model: Purchase): PurchaseFields {
    return {
      retailerId: model.getRetailerId(),
      total: model.getTotal(),
      date: model.getDate(),
      createdByUserId: model.getCreatedByUserId(),
      deletedByUserId: model.getDeletedByUserId(),
      updatedByUserId: model.getUpdatedByUserId(),
      createdAt: model.getCreatedAt(),
      deletedAt: model.getDeletedAt(),
      id: model.getId(),
      updatedAt: model.getUpdatedAt(),
    };
  }
}
