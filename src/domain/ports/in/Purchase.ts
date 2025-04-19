import { PurchaseFormDTO } from "@/dtos/purchase/request/Form";
import { Purchase } from "@/models/Purchase";
import { CRUDPortIn } from "./CRUD";

export type PurchasePortIn = CRUDPortIn<Purchase, PurchaseFormDTO>;