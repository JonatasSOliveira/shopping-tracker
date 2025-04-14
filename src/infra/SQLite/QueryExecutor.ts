import { Where } from "@/types/repositories/Where";
import { SQLiteProvider } from "./Provider";
import { SQLiteBindValue } from "expo-sqlite";
import { Logger, LogLevel } from "@/services/Logger";

export class SQLiteQueryExecutor {
  private buildClause<T>(
    data: Partial<T>,
    separator = ", ",
    prefix = "",
  ): { clause: string; values: SQLiteBindValue[] } {
    const keys = Object.keys(data);
    const clause = keys.map((key) => `${prefix}${key} = ?`).join(separator);
    const values = keys.map((key) => data[key as keyof T]) as SQLiteBindValue[];
    return { clause, values };
  }

  public async insert<T extends { getId(): string }>(
    table: string,
    data: T,
  ): Promise<string> {
    const keys = Object.keys(data);
    const placeholders = keys.map(() => "?").join(", ");
    const values = keys.map((key) => data[key as keyof T]) as SQLiteBindValue[];

    const sql = `INSERT INTO ${table} (${keys.join(", ")}) VALUES (${placeholders})`;
    Logger.log(
      LogLevel.DEBUG,
      `[SQLiteQueryExecutor] Executing '${sql}' with values ${values}`,
    );
    const db = await SQLiteProvider.get();
    await db.runAsync(sql, values);
    return data.getId() as string;
  }

  public async update<T, W>(
    table: string,
    data: Partial<T>,
    where: Where<W>,
  ): Promise<void> {
    const { clause: setClause, values: setValues } = this.buildClause(data);
    const { clause: whereClause, values: whereValues } = this.buildClause(
      where,
      " AND ",
    );

    const sql = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`;
    Logger.log(LogLevel.DEBUG, `[SQLiteQueryExecutor] Executing '${sql}'`);
    const db = await SQLiteProvider.get();
    await db.runAsync(sql, [...setValues, ...whereValues]);
  }

  public async select<T>(table: string, where: Where<T> = {}): Promise<T[]> {
    const hasWhere = Object.keys(where).length > 0;
    const { clause: whereClause, values: whereValues } = this.buildClause(
      where,
      " AND ",
    );

    const sql = `SELECT * FROM ${table}${hasWhere ? " WHERE " + whereClause : ""}`;
    Logger.log(LogLevel.DEBUG, `[SQLiteQueryExecutor] Executing '${sql}'`);
    const db = await SQLiteProvider.get();
    return await db.getAllAsync<T>(sql, whereValues);
  }
}
