import { Model } from "@/decorators/database/Model";
import { Field } from "@/decorators/database/Field";
import { Label } from "@/decorators/presentation/Label";
import { NotNull } from "@/decorators/database/NotNull";
import { ApprovableModel, ApprovableModelFields } from "./ApprovableModel";

export interface RetailerFields extends ApprovableModelFields {
  name?: string;
  address?: string;
  city?: string;
  stateUf?: string;
  latitude?: number;
  longitute?: number;
}

@Model("retailer")
export class Retailer extends ApprovableModel {
  @Field()
  @NotNull()
  @Label("Nome")
  private name: string;

  @Field()
  @Label("Endereço")
  private address?: string;

  @Field()
  @Label("Cidade")
  private city?: string;

  @Field()
  @Label("UF")
  private stateUf?: string;

  @Field()
  @Label("Latitude")
  private latitude?: number;

  @Field()
  @Label("Longitude")
  private longitute?: number;

  constructor(data: RetailerFields) {
    super(data);
    this.name = data.name ?? "";
    this.address = data.address;
    this.city = data.city;
    this.stateUf = data.stateUf;
    this.latitude = data.latitude;
    this.longitute = data.longitute;
  }

  public getName(): string {
    return this.name;
  }

  public getAddress(): string | undefined {
    return this.address;
  }

  public getCity(): string | undefined {
    return this.city;
  }

  public getStateUf(): string | undefined {
    return this.stateUf;
  }

  public getLatitude(): number | undefined {
    return this.latitude;
  }

  public getLongitute(): number | undefined {
    return this.longitute;
  }
}
