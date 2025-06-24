import { PurchaseRepository } from "@/ports/out/PurchaseRepository";
import { FirebaseBaseRepositoryAdapter } from "@devjonatas/devkit/adapters";
import { Purchase, PurchaseFields } from "@/models/Purchase";
import { ModelMapperPort } from "@devjonatas/devkit/ports/middleware";

export class FirebasePurchaseRepositoryAdapter
  extends FirebaseBaseRepositoryAdapter<Purchase, PurchaseFields>
  implements PurchaseRepository
{
  constructor(mapper: ModelMapperPort<Purchase, PurchaseFields, any>) {
    super(mapper, Purchase);
  }
}
