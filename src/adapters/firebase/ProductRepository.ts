import { ProductRepository } from "@/ports/out/ProductRepository";
import { FirebaseBaseRepositoryAdapter } from "./BaseRepository";
import { Product, ProductFields } from "@/models/Product";
import { Firestore } from "firebase/firestore";
import { ModelMapperPort } from "@/ports/middleware/Mapper";

export class FirebaseProductRepositoryAdapter
  extends FirebaseBaseRepositoryAdapter<Product, ProductFields>
  implements ProductRepository
{
  constructor(
    firestore: Firestore,
    mapper: ModelMapperPort<Product, ProductFields, any>,
  ) {
    super(firestore, mapper, Product);
  }
}
