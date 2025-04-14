import { NOT_NULL_KEY } from "./symbols";

export function NotNull(): PropertyDecorator {
  return (target, propertyKey) => {
    Reflect.defineMetadata(NOT_NULL_KEY, true, target, propertyKey);
  };
}

export function isNotNull(
  target: object,
  propertyKey: string | symbol,
): boolean {
  return Reflect.getMetadata(NOT_NULL_KEY, target, propertyKey);
}
