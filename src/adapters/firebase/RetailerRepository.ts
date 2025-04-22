import { RetailerRepository } from "@/ports/out/RetailerRepository";
import { FirebaseBaseRepositoryAdapter } from "./BaseRepository";
import { Retailer, RetailerFields } from "@/models/Retailer";
import { Firestore } from "firebase/firestore";
import { ModelMapperPort } from "@/ports/middleware/Mapper";

export class FirebaseRetailerRepositoryAdapter
  extends FirebaseBaseRepositoryAdapter<Retailer, RetailerFields>
  implements RetailerRepository
{
  constructor(
    firestore: Firestore,
    mapper: ModelMapperPort<Retailer, RetailerFields, any>,
  ) {
    super(firestore, mapper, Retailer);
  }
}
