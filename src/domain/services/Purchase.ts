import { Purchase, PurchaseFields } from "@/models/Purchase";
import { CRUDService } from "./CRUD";
import { PurchaseFormDTO } from "@/dtos/purchase/request/Form";
import { PurchasePortIn } from "@/ports/in/Purchase";
import { PurchaseRepository } from "@/ports/out/PurchaseRepository";
import { ModelMapperPort } from "@/ports/middleware/Mapper";
import { SessionStoragePortOut } from "@/ports/out/SessionStorage";

export class PurchaseService
  extends CRUDService<Purchase, PurchaseFields, PurchaseFormDTO>
  implements PurchasePortIn
{
  constructor(
    protected repository: PurchaseRepository,
    protected mapper: ModelMapperPort<
      Purchase,
      PurchaseFields,
      PurchaseFormDTO
    >,
    protected sessionStorage: SessionStoragePortOut,
  ) {
    super(repository, mapper, sessionStorage);
  }

  public create(data: PurchaseFormDTO): Promise<string> {
    return super.create(data);
  }
}
