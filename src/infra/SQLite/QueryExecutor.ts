import { SQLiteProvider } './Provider'

export class SQLiteQueryExecutor {
  async insert<T>(table: string, data: Partial<T>): Promise<number> {
    const keys = Object.keys(data).join(", ");
    const placeholders = Object.keys(data).map(() => "?").join(", ");
    const values = Object.values(data);

    const result = await SQLiteProvider.get().run(
      `INSERT INTO ${table} (${keys}) VALUES (${placeholders})`,
      values
    );

    return result.insertId;
  }
}