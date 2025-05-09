import { PurchaseRepository } from "@/ports/out/PurchaseRepository";
import { FirebaseBaseRepositoryAdapter } from "./BaseRepository";
import { Purchase, PurchaseFields } from "@/models/Purchase";
import { ModelMapperPort } from "@/ports/middleware/Mapper";

export class FirebasePurchaseRepositoryAdapter
  extends FirebaseBaseRepositoryAdapter<Purchase, PurchaseFields>
  implements PurchaseRepository
{
  constructor(mapper: ModelMapperPort<Purchase, PurchaseFields, any>) {
    super(mapper, Purchase);
  }
}
