import { SQLiteAdaptersFacade } from "@/adapters/SQLite/Facade";
import { ServiceFacadePortIn } from "@/ports/in/ServiceFacade";
import { ServiceFacade } from "./ServiceFacade";

export class ServiceFacadeProvider {
  private static serviceFacadeLocal: ServiceFacadePortIn;

  public static getLocal() {
    if (!this.serviceFacadeLocal) {
      this.serviceFacadeLocal = new ServiceFacade(new SQLiteAdaptersFacade());
    }
    return this.serviceFacadeLocal;
  }
}
