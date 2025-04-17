import { RetailerFormDTO } from "@/dtos/retailer/request/Form";
import { Retailer, RetailerFields } from "@/models/Retailer";
import { RetailerPortIn } from "@/ports/in/Retailer";
import { CRUDService } from "./CRUD";

export class RetailerService
  extends CRUDService<Retailer, RetailerFields, RetailerFormDTO>
  implements RetailerPortIn {}
