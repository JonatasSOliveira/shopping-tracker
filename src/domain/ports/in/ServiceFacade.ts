import { RetailerService } from "@/services/Retailer";
import { AuthPortIn } from "./Auth";
import { SyncLocalDataPortIn } from "./SyncLocalData";

export interface ServiceFacadePortIn {
  getRetailerService(): RetailerService;
  getAuth(): AuthPortIn;
  getSyncLocalData(): SyncLocalDataPortIn;
}
