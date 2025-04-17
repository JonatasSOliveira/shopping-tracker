import { RetailerFormDTO } from "@/dtos/retailer/request/Form";
import { Retailer } from "@/models/Retailer";
import { CRUDPortIn } from "./CRUD";

export type RetailerPortIn = CRUDPortIn<Retailer, RetailerFormDTO>;
