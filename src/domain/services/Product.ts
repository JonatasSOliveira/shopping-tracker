import { Product, ProductFields } from "@/models/Product";
import { CRUDService } from "./CRUD";
import { ProductFormDTO } from "@/dtos/product/request/Form";
import { ProductPortIn } from "@/ports/in/Product";

export class ProductService
  extends CRUDService<Product, ProductFields, ProductFormDTO>
  implements ProductPortIn {}
