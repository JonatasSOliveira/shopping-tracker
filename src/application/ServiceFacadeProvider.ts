import { SQLiteAdaptersFacade } from "@/adapters/SQLite/Facade";
import { ServiceFacadePortIn } from "@/ports/in/ServiceFacade";
import { ServiceFacade } from "./ServiceFacade";
import { FirebaseAdaptersFacade } from "@/adapters/firebase/Facade";

export class ServiceFacadeProvider {
  private static serviceFacadeLocal: ServiceFacadePortIn;
  private static serviceFacadeCloud: ServiceFacadePortIn;

  public static getLocal(): ServiceFacadePortIn {
    if (!this.serviceFacadeLocal) {
      this.serviceFacadeLocal = new ServiceFacade(new SQLiteAdaptersFacade());
    }
    return this.serviceFacadeLocal;
  }

  public static getCloud(): ServiceFacadePortIn {
    if (!this.serviceFacadeCloud) {
      this.serviceFacadeCloud = new ServiceFacade(new FirebaseAdaptersFacade());
    }
    return this.serviceFacadeCloud;
  }
}
