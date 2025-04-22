import { PurchaseRepository } from "@/ports/out/PurchaseRepository";
import { FirebaseBaseRepositoryAdapter } from "./BaseRepository";
import { Purchase, PurchaseFields } from "@/models/Purchase";
import { Firestore } from "firebase/firestore";
import { ModelMapperPort } from "@/ports/middleware/Mapper";

export class FirebasePurchaseRepositoryAdapter
  extends FirebaseBaseRepositoryAdapter<Purchase, PurchaseFields>
  implements PurchaseRepository
{
  constructor(
    firestore: Firestore,
    mapper: ModelMapperPort<Purchase, PurchaseFields, any>,
  ) {
    super(firestore, mapper, Purchase);
  }
}
