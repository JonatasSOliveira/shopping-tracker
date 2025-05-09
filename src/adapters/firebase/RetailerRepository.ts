import { RetailerRepository } from "@/ports/out/RetailerRepository";
import { FirebaseBaseRepositoryAdapter } from "./BaseRepository";
import { Retailer, RetailerFields } from "@/models/Retailer";
import { ModelMapperPort } from "@/ports/middleware/Mapper";

export class FirebaseRetailerRepositoryAdapter
  extends FirebaseBaseRepositoryAdapter<Retailer, RetailerFields>
  implements RetailerRepository
{
  constructor(mapper: ModelMapperPort<Retailer, RetailerFields, any>) {
    super(mapper, Retailer);
  }
}
