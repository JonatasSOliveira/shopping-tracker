import { RetailerRepository } from "@/ports/out/RetailerRepository";
import { FirebaseBaseRepositoryAdapter } from "@devjonatas/devkit/adapters";
import { Retailer, RetailerFields } from "@/models/Retailer";
import { ModelMapperPort } from "@devjonatas/devkit/ports/middleware";

export class FirebaseRetailerRepositoryAdapter
  extends FirebaseBaseRepositoryAdapter<Retailer, RetailerFields>
  implements RetailerRepository
{
  constructor(mapper: ModelMapperPort<Retailer, RetailerFields, any>) {
    super(mapper, Retailer);
  }
}
