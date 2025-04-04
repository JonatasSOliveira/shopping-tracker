import { SQLiteProvider } from "./Provider";

export class SQLiteQueryExecutor {
  async insert<T>(table: string, data: Partial<T>): Promise<number> {
    const keys = Object.keys(data).join(", ");
    const placeholders = Object.keys(data)
      .map(() => "?")
      .join(", ");
    const values: (string | number)[] = Object.values(data);

    const result = await (
      await SQLiteProvider.get()
    ).runAsync(
      `INSERT INTO ${table} (${keys}) VALUES (${placeholders})`,
      values,
    );

    return result.lastInsertRowId;
  }
}
