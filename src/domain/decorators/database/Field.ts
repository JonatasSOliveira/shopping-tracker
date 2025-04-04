import "reflect-metadata";
import { FIELDS_KEY } from "./symbols";

export interface FieldData {
  name: string;
  type: string;
}

export function Field(): PropertyDecorator {
  return function (target, propertyKey) {
    const constructor = target.constructor;
    const fields: { name: string; type: string }[] =
      Reflect.getMetadata(FIELDS_KEY, constructor) || [];

    const type = Reflect.getMetadata("design:type", target, propertyKey);

    fields.push({
      name: propertyKey.toString(),
      type: type.name.toLowerCase(),
    });

    Reflect.defineMetadata(FIELDS_KEY, fields, constructor);
  };
}

export function getModelFields(target: Function): FieldData[] {
  return Reflect.getMetadata(FIELDS_KEY, target) || [];
}
