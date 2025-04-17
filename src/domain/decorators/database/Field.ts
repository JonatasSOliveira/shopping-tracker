import "reflect-metadata";
import { FIELDS_KEY } from "./symbols";

export interface FieldData {
  name: string;
  type: string;
}

export function Field(): PropertyDecorator {
  return function (target, propertyKey) {
    const constructor = target.constructor;

    const ownFields: FieldData[] =
      Reflect.getOwnMetadata(FIELDS_KEY, constructor) || [];

    const type = Reflect.getMetadata("design:type", target, propertyKey);

    ownFields.push({
      name: propertyKey.toString(),
      type: type.name.toLowerCase(),
    });

    Reflect.defineMetadata(FIELDS_KEY, ownFields, constructor);
  };
}

export function getModelFields(target: Function): FieldData[] {
  const allFields: FieldData[] = [];

  let current = target;

  while (current && current !== Object) {
    const fields: FieldData[] =
      Reflect.getOwnMetadata(FIELDS_KEY, current) || [];
    allFields.push(...fields);
    current = Object.getPrototypeOf(current);
  }

  return allFields;
}
