import { FieldData, getModelFields } from "@/decorators/database/Field";
import { getTableName } from "@/decorators/database/Model";
import { allModels } from "@/infra/orm/ModelRegistry";
import { SQLiteProvider } from "@/infra/SQLite/Provider";
import { SyncLocalDatabasePortOut } from "@/ports/out/SyncLocalDatabase";
import { Logger, LogLevel } from "@/services/Logger";
import * as SQLite from "expo-sqlite";

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
    try {
      Logger.log(LogLevel.INFO, "Syncing local database...");
      const db = await SQLiteProvider.get();

      for (const model of allModels) {
        const table = getTableName(model);
        const fields = getModelFields(model);

        Logger.log(LogLevel.INFO, `Checking table ${table}`);
        const existingColumns = await this.getExistingColumns(db, table);

        if (existingColumns.length === 0) {
          const sql = this.generateCreateTableSQL(table, fields);
          Logger.log(LogLevel.DEBUG, sql);
          await db.execAsync(sql);
          Logger.log(LogLevel.INFO, `Table ${table} created`);
        } else {
          await this.updateTableSchema(db, table, fields, existingColumns);
          Logger.log(LogLevel.INFO, `Table ${table} updated`);
        }
      }

      Logger.log(LogLevel.INFO, "Local database synced");
    } catch (error) {
      Logger.log(LogLevel.ERROR, "Error syncing local database", error);
    }
  }

  private async getExistingColumns(
    db: SQLite.SQLiteDatabase,
    table: string,
  ): Promise<string[]> {
    try {
      const result = await db.getAllAsync(`PRAGMA table_info(${table});`);
      return result.map((row: any) => row.name);
    } catch {
      return [];
    }
  }

  private async updateTableSchema(
    db: SQLite.SQLiteDatabase,
    table: string,
    fields: FieldData[],
    existingColumns: string[],
  ): Promise<void> {
    for (const field of fields) {
      if (!existingColumns.includes(field.name)) {
        const sql = `ALTER TABLE ${table} ADD COLUMN ${field.name} ${this.mapType(
          field.type,
        )};`;
        Logger.log(LogLevel.DEBUG, sql);
        await db.execAsync(sql);
      }
    }
  }

  private generateCreateTableSQL(table: string, fields: FieldData[]): string {
    const fieldDefs = fields
      .map((f) => `${f.name} ${this.mapType(f.type)}`)
      .join(", ");
    return `CREATE TABLE IF NOT EXISTS ${table} (${fieldDefs});`;
  }
}
