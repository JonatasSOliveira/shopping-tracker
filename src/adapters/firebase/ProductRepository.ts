import { ProductRepository } from "@/ports/out/ProductRepository";
import { FirebaseBaseRepositoryAdapter } from "./BaseRepository";
import { Product, ProductFields } from "@/models/Product";
import { ModelMapperPort } from "@/ports/middleware/Mapper";

export class FirebaseProductRepositoryAdapter
  extends FirebaseBaseRepositoryAdapter<Product, ProductFields>
  implements ProductRepository
{
  constructor(mapper: ModelMapperPort<Product, ProductFields, any>) {
    super(mapper, Product);
  }
}
