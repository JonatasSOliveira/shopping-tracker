import { ProductRepository } from "@/ports/out/ProductRepository";
import { FirebaseBaseRepositoryAdapter } from "@devjonatas/devkit/adapters";
import { Product, ProductFields } from "@/models/Product";
import { ModelMapperPort } from "@devjonatas/devkit/ports/middleware";

export class FirebaseProductRepositoryAdapter
  extends FirebaseBaseRepositoryAdapter<Product, ProductFields>
  implements ProductRepository
{
  constructor(mapper: ModelMapperPort<Product, ProductFields, any>) {
    super(mapper, Product);
  }
}
