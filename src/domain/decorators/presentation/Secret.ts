import { SECRET_KEY } from "./symbols";

export function Secret(target: object, propertyKey: string | symbol): void {
  Reflect.defineMetadata(SECRET_KEY, true, target, propertyKey);
}

export function isSecret(
  target: object,
  propertyKey: string | symbol,
): boolean {
  return Reflect.getMetadata(SECRET_KEY, target, propertyKey);
}
