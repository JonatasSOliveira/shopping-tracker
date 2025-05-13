import { Product } from "@/models/Product";
import { CRUDPortIn } from "./CRUD";
import { ProductFormDTO } from "@/dtos/product/request/Form";

export interface ProductPortIn extends CRUDPortIn<Product, ProductFormDTO> {
  findByBarCode(barCode: string): Promise<Product | null>;
}
