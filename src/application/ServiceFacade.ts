import { SQLiteSyncLocalDatabase } from "@/adapters/SQLite/SyncLocalDatabase";
import { SQLiteUserRepositoryAdapter } from "@/adapters/SQLite/UserRepository";
import { AuthPortIn } from "@/ports/in/Auth";
import { SyncLocalDataPortIn } from "@/ports/in/SyncLocalData";
import { AuthService } from "@/services/Auth";
import { DTOValidatorService } from "@/services/DTOValidator";
import { SyncLocalDataService } from "@/services/SyncLocalData";

export class ServiceFacade {
  private static authService: AuthPortIn;
  private static syncLocalData: SyncLocalDataPortIn;

  public static getAuth() {
    if (!this.authService) {
      this.authService = new AuthService(
        new SQLiteUserRepositoryAdapter(),
        new DTOValidatorService(),
      );
    }
    return this.authService;
  }

  public static getSyncLocalData() {
    if (!this.syncLocalData) {
      this.syncLocalData = new SyncLocalDataService(
        new SQLiteSyncLocalDatabase(),
      );
    }
    return this.syncLocalData;
  }
}
