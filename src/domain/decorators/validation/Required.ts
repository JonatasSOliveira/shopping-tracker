import { REQUIRED_KEY } from "./symbols";

export function Required(target: object, propertyKey: string | symbol): void {
  Reflect.defineMetadata(REQUIRED_KEY, true, target, propertyKey);
}

export function isRequired(
  target: object,
  propertyKey: string | symbol,
): boolean {
  return Reflect.getMetadata(REQUIRED_KEY, target, propertyKey);
}
