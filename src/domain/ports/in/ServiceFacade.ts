import { ProductPortIn } from "./Product";
import { PurchasePortIn } from "./Purchase";
import { RetailerPortIn } from "./Retailer";
import { SyncLocalDataPortIn } from "./SyncLocalData";

export interface ServiceFacadePortIn {
  getRetailerService(): RetailerPortIn;
  getSyncLocalData(): SyncLocalDataPortIn;
  getProductService(): ProductPortIn;
  getPurchaseService(): PurchasePortIn;
}
