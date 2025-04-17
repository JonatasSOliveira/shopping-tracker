import { Product } from "@/models/Product";
import { CRUDPortIn } from "./CRUD";
import { ProductFormDTO } from "@/dtos/product/request/Form";

export type ProductPortIn = CRUDPortIn<Product, ProductFormDTO>;
