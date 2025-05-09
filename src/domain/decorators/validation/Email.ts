import { EMAIL_KEY } from "./symbols";

export function Email(target: object, propertyKey: string | symbol): void {
  Reflect.defineMetadata(EMAIL_KEY, true, target, propertyKey);
}

export function isEmail(target: object, propertyKey: string | symbol): boolean {
  return Reflect.getMetadata(EMAIL_KEY, target, propertyKey);
}
