import * as SQLite from 'expo-sqlite';

export class SQLiteProvider {
  private static db: SQLite.SQLiteDatabase?
  
  public static async get(): Promise<SQLite.SQLiteDatabase> {
    if (SQLiteProvider.db) {
      return SQLiteProvider.db
    }
    
    SQLiteProvider.db = await SQLite.openDatabaseAsync('shopping-tracker')
    return SQLiteProvider.db
  }
}