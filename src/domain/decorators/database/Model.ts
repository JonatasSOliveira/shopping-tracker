import { TABLE_KEY } from "./symbols";

export function Model(tableName: string) {
  return function (target: Function) {
    Reflect.defineMetadata(TABLE_KEY, tableName, target);
  };
}

export function getTableName(target: Function): string {
  return Reflect.getMetadata(TABLE_KEY, target);
}
