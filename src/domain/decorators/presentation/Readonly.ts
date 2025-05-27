import { READONLY_KEY } from "./symbols";

export function Readonly(target: object, propertyKey: string | symbol): void {
  Reflect.defineMetadata(READONLY_KEY, true, target, propertyKey);
}

export function isReadonly(
  target: object,
  propertyKey: string | symbol,
): boolean {
  return Reflect.getMetadata(READONLY_KEY, target, propertyKey);
}
