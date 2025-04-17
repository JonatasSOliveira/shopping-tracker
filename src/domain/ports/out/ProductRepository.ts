import { Product, ProductFields } from "@/models/Product";
import { BaseRepository } from "./BaseRepository";

export type ProductRepository = BaseRepository<Product, ProductFields>;
