import { LABEL_KEY } from "./symbols";

export function Label(label: string) {
  return (target: any, propertyKey: string) => {
    Reflect.defineMetadata(LABEL_KEY, label, target, propertyKey);
  };
}

export function getLabel(target: any, propertyKey: string): string | undefined {
  return Reflect.getMetadata(LABEL_KEY, target, propertyKey);
}

export function getLabelWithFallback({
  dtoPrototype,
  modelPrototype,
  propertyKey,
}: {
  dtoPrototype: object;
  modelPrototype?: object;
  propertyKey: string;
}): string {
  let label = Reflect.getMetadata(LABEL_KEY, dtoPrototype, propertyKey);

  if (!label && modelPrototype) {
    label = Reflect.getMetadata(LABEL_KEY, modelPrototype, propertyKey);
  }

  return label || propertyKey.charAt(0).toUpperCase() + propertyKey.slice(1);
}
