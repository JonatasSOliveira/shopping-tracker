import { SQLiteSyncLocalDatabase } from "@/adapters/SQLite/SyncLocalDatabase";
import { AuthPortIn } from "@/ports/in/Auth";
import { ServiceFacadePortIn } from "@/ports/in/ServiceFacade";
import { SyncLocalDataPortIn } from "@/ports/in/SyncLocalData";
import { AdaptersFacadePortOut } from "@/ports/out/AdaptersFacade";
import { AuthService } from "@/services/Auth";
import { DTOValidatorService } from "@/services/DTOValidator";
import { RetailerService } from "@/services/Retailer";
import { SyncLocalDataService } from "@/services/SyncLocalData";

export class ServiceFacade implements ServiceFacadePortIn {
  private authService?: AuthPortIn;
  private syncLocalData?: SyncLocalDataPortIn;
  private retailerService?: RetailerService;

  constructor(private readonly adaptersFacade: AdaptersFacadePortOut) {}

  public getAuth() {
    if (!this.authService) {
      this.authService = new AuthService(
        this.adaptersFacade.getUserRepository(),
        new DTOValidatorService(),
      );
    }
    return this.authService;
  }

  public getSyncLocalData() {
    if (!this.syncLocalData) {
      this.syncLocalData = new SyncLocalDataService(
        new SQLiteSyncLocalDatabase(),
      );
    }
    return this.syncLocalData;
  }

  public getRetailerService() {
    if (!this.retailerService) {
      this.retailerService = new RetailerService(
        this.adaptersFacade.getRetailerRepository(),
      );
    }
    return this.retailerService;
  }
}
