import "reflect-metadata";
import { FIELDS_KEY } from "./symbols";

export interface FieldData {
  name: string;
  type: string;
  enumObject?: object;
}

export function Field(
  typeOverride?: string | { type: string; enumObject?: object },
): PropertyDecorator {
  return function (target, propertyKey) {
    const constructor = target.constructor;
    const ownFields: FieldData[] =
      Reflect.getOwnMetadata(FIELDS_KEY, constructor) || [];

    let type = Reflect.getMetadata(
      "design:type",
      target,
      propertyKey,
    )?.name?.toLowerCase();
    let enumObject: object | undefined;

    if (typeof typeOverride === "string") {
      type = typeOverride.toLowerCase();
    } else if (typeof typeOverride === "object" && typeOverride.type) {
      type = typeOverride.type.toLowerCase();
      enumObject = typeOverride.enumObject;
    }

    ownFields.push({
      name: propertyKey.toString(),
      type,
      enumObject,
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
