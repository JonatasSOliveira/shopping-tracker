import { Model } from "@/decorators/database/Model";
import { Field } from "@/decorators/database/Field";
import { NotNull } from "@/decorators/database/NotNull";
import { ForeignKey } from "@/decorators/database/ForeignKey";
import { Label } from "@/decorators/presentation/Label";
import { Retailer } from "./Retailer";
import { UserTrackedModel, UserTrackedModelFields } from "./UserTracked";

export interface PurchaseFields extends UserTrackedModelFields {
  retailerId?: number;
  total?: number;
  date?: Date;
}

@Model("purchase")
export class Purchase extends UserTrackedModel {
  @Field()
  @NotNull()
  @ForeignKey(() => Retailer)
  @Label("Estabelecimento")
  private retailerId: number;

  @Field()
  @NotNull()
  @Label("Valor total")
  private total: number;

  @Field()
  @NotNull()
  @Label("Data da compra")
  private date: Date;

  constructor(data: Partial<PurchaseFields>) {
    super(data);
    this.retailerId = data.retailerId ?? 0;
    this.total = data.total ?? 0;
    this.date = data.date ?? new Date();
  }

  public getRetailerId() {
    return this.retailerId;
  }
  public getTotal() {
    return this.total;
  }
  public getDate() {
    return this.date;
  }
}
