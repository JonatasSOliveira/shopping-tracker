import { SyncLocalDataPortIn } from "@/ports/in/SyncLocalData";
import { SyncLocalDatabasePortOut } from "@/ports/out/SyncLocalDatabase";

export class SyncLocalDataService implements SyncLocalDataPortIn {
  constructor(private localDatabase: SyncLocalDatabasePortOut) {}

  public async syncData(): Promise<void> {
    await this.localDatabase.syncData();
  }
}
