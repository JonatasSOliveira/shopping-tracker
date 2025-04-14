import { AuthPortIn } from "./Auth";
import { RetailerPortIn } from "./Retailer";
import { SyncLocalDataPortIn } from "./SyncLocalData";

export interface ServiceFacadePortIn {
  getRetailerService(): RetailerPortIn;
  getAuth(): AuthPortIn;
  getSyncLocalData(): SyncLocalDataPortIn;
}
