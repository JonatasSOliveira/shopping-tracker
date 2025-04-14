import { PK_KEY } from "./symbols";

export function PrimaryKey(): PropertyDecorator {
  return (target, propertyKey) => {
    Reflect.defineMetadata(PK_KEY, true, target, propertyKey);
  };
}

export function isPrimaryKey(
  target: object,
  propertyKey: string | symbol,
): boolean {
  return Reflect.getMetadata(PK_KEY, target, propertyKey);
}
