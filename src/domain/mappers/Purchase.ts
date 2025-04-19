import { PurchaseFormDTO } from "@/dtos/purchase/request/Form";
import { Purchase, PurchaseFields } from "@/models/Purchase";
import { ModelMapperPort } from "@/ports/middleware/Mapper";

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
}