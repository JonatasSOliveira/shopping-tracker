import { getLabelWithFallback } from "@/decorators/presentation/Label";

export abstract class BaseDTO<DTOFields> {
  private modelPrototype?: object;

  constructor(modelPrototype?: object) {
    this.modelPrototype = modelPrototype;
  }

  abstract updateDataFromObject(data: DTOFields): void;

  public getLabel(field: keyof DTOFields): string {
    return getLabelWithFallback({
      dtoPrototype: Object.getPrototypeOf(this),
      modelPrototype: this.modelPrototype,
      propertyKey: field as string,
    });
  }
}
