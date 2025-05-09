import "reflect-metadata";
import { DEFAULT_KEY } from "./symbols";

export function Default(value?: unknown): PropertyDecorator {
  return (target, propertyKey) => {
    const designType = Reflect.getMetadata("design:type", target, propertyKey);

    if (typeof designType === "function") {
      const expectedType = designType.name.toLowerCase();
      const actualType = typeof value;

      if (value !== undefined && expectedType !== actualType) {
        throw new TypeError(
          `[Default] Incompatible type for "${String(propertyKey)}": expected "${expectedType}", got "${actualType}"`,
        );
      }
    } else if (typeof designType === "object") {
      const expectedValues = Object.values(designType);

      if (!expectedValues.includes(value)) {
        throw new TypeError(
          `[Default] Incompatible type for "${String(propertyKey)}": expected "${expectedValues}", got "${value}"`,
        );
      }
    }

    Reflect.defineMetadata(DEFAULT_KEY, value, target, propertyKey);
  };
}

export function getDefaultValue<T = any>(
  target: any,
  propertyKey: string | symbol,
): T | undefined {
  return Reflect.getMetadata(DEFAULT_KEY, target, propertyKey);
}
