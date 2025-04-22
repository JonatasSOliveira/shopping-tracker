import { FieldData, getModelFields } from "@/decorators/database/Field";
import { getTableName } from "@/decorators/database/Model";
import { isNotNull } from "@/decorators/database/NotNull";
import { isPrimaryKey } from "@/decorators/database/PrimaryKey";
import { getForeignKey } from "@/decorators/database/ForeignKey";
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
          const sql = this.generateCreateTableSQL(model, table, fields);
          Logger.log(
            LogLevel.DEBUG,
            `[SQLiteSyncLocalDatabase] Executing '${sql}'`,
          );
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
        const foreignKey = getForeignKey(db, field.name);
        if (foreignKey) {
          await this.addForeignKey(db, table, field, foreignKey);
        } else {
          const sql = `ALTER TABLE ${table} ADD COLUMN ${field.name} ${this.mapType(field.type)};`;
          Logger.log(
            LogLevel.DEBUG,
            `[SQLiteSyncLocalDatabase] Executing '${sql}'`,
          );
          await db.execAsync(sql);
        }
      }
    }
  }

  private async addForeignKey(
    db: SQLite.SQLiteDatabase,
    table: string,
    field: FieldData,
    foreignKey: any,
  ): Promise<void> {
    const referencedTable = getTableName(foreignKey.referencedModel());
    const sql = `ALTER TABLE ${table} ADD COLUMN ${field.name} ${this.mapType(field.type)};`;
    Logger.log(LogLevel.DEBUG, `[SQLiteSyncLocalDatabase] Executing '${sql}'`);
    await db.execAsync(sql);

    const addForeignKeySql = `PRAGMA foreign_keys = ON; 
      ALTER TABLE ${table} ADD CONSTRAINT fk_${table}_${field.name} FOREIGN KEY (${field.name}) REFERENCES ${referencedTable}(id);`;

    Logger.log(
      LogLevel.DEBUG,
      `[SQLiteSyncLocalDatabase] Executing '${addForeignKeySql}'`,
    );
    await db.execAsync(addForeignKeySql);
  }

  private generateCreateTableSQL(
    model: any,
    table: string,
    fields: FieldData[],
  ): string {
    const fieldDefs = fields.map((f) => {
      const baseType = this.mapType(f.type);
      const modifiers: string[] = [];

      if (isPrimaryKey(model.prototype, f.name)) {
        modifiers.push("PRIMARY KEY");
      } else if (isNotNull(model.prototype, f.name)) {
        modifiers.push("NOT NULL");
      }

      const foreignKey = getForeignKey(model.prototype, f.name);
      if (foreignKey) {
        const referencedTable = getTableName(foreignKey.referencedModel());
        modifiers.push(`REFERENCES ${referencedTable}(id)`);
      }

      return `${f.name} ${baseType} ${modifiers.join(" ")}`.trim();
    });

    return `CREATE TABLE IF NOT EXISTS ${table} (${fieldDefs.join(", ")});`;
  }
}
