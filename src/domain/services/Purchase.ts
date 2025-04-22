import { Purchase, PurchaseFields } from "@/models/Purchase";
import { CRUDService } from "./CRUD";
import { PurchaseFormDTO } from "@/dtos/purchase/request/Form";
import { PurchasePortIn } from "@/ports/in/Purchase";

export class PurchaseService
  extends CRUDService<Purchase, PurchaseFields, PurchaseFormDTO>
  implements PurchasePortIn {}
