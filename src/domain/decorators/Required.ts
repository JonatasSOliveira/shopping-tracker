import "reflect-metadata";

export function Required(target: object, propertyKey: string | symbol): void {
  Reflect.defineMetadata("required", true, target, propertyKey);
}
