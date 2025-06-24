import { Product, ProductFields } from "@/models/Product";
import { BaseRepository } from "@devjonatas/devkit/ports/out";

export type ProductRepository = BaseRepository<Product, ProductFields>;
