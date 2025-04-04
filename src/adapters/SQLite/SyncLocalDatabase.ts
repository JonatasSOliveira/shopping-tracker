import { FieldData, getModelFields } from "@/decorators/database/Field";
import { getTableName } from "@/decorators/database/Model";
import { allModels } from "@/infra/orm/ModelRegistry";
import { SQLiteProvider } from "@/infra/SQLite/Provider";
import { SyncLocalDatabasePortOut } from "@/ports/out/SyncLocalDatabase";

export class SQLiteSyncLocalDatabase implements SyncLocalDatabasePortOut {
  private mapType(type: string): string {
    switch (type) {
      case "string":
        return "TEXT";
      case "number":
        return "INTEGER";
      case "boolean":
        return "BOOLEAN";
      case "date":
        return "DATETIME";
      default:
        return "TEXT";
    }
  }

  public async syncData(): Promise<void> {
    const db = await SQLiteProvider.get();

    for (const model of allModels) {
      const table = getTableName(model);
      const fields = getModelFields(model);
      const sql = this.generateCreateTableSQL(table, fields);
      await db.execAsync(sql);
    }
  }

  private generateCreateTableSQL(table: string, fields: FieldData[]): string {
    const fieldDefs = fields
      .map((f) => `${f.name} ${this.mapType(f.type)}`)
      .join(", ");
    return `CREATE TABLE IF NOT EXISTS ${table} (${fieldDefs});`;
  }
}
