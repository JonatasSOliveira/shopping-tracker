import { FOREIGN_KEY } from "./symbols";

export interface ForeignKeyData {
  referencedModel: () => Function;
}

export function ForeignKey(referencedModel: () => Function): PropertyDecorator {
  return (target, propertyKey) => {
    const constructor = target.constructor;

    const foreignKeys: Record<string, ForeignKeyData> =
      Reflect.getOwnMetadata(FOREIGN_KEY, constructor) || {};

    foreignKeys[propertyKey.toString()] = {
      referencedModel,
    };

    Reflect.defineMetadata(FOREIGN_KEY, foreignKeys, constructor);
  };
}

export function getForeignKeys(
  target: Function,
): Record<string, ForeignKeyData> {
  return Reflect.getMetadata(FOREIGN_KEY, target) || {};
}

export function getForeignKey(
  target: any,
  propertyKey: string,
): ForeignKeyData | null {
  const foreignKeys = getForeignKeys(target.constructor);
  return foreignKeys[propertyKey] || null;
}
