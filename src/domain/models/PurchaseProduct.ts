import { ForeignKey } from "@/decorators/database/ForeignKey";
import { UserTrackedModel, UserTrackedModelFields } from "./UserTracked";
import { Product } from "./Product";
import { Purchase } from "./Purchase";
import { Field } from "@/decorators/database/Field";
import { NotNull } from "@/decorators/database/NotNull";

export interface PurchaseProductFields extends UserTrackedModelFields {
  productId: string;
  purchaseId: string;
  quantity: number;
  unitPrice: number;
  isOnSale: boolean;
}

export class PurchaseProduct extends UserTrackedModel {
  @Field()
  @NotNull()
  @ForeignKey(() => Product)
  private productId: string;

  @Field()
  @NotNull()
  @ForeignKey(() => Purchase)
  private purchaseId: string;

  @Field()
  @NotNull()
  private quantity: number;

  @Field()
  @NotNull()
  private unitPrice: number;

  @Field()
  @NotNull()
  private isOnSale: boolean;

  private total: number;

  constructor(data: PurchaseProductFields) {
    super(data);
    this.productId = data.productId;
    this.purchaseId = data.purchaseId;
    this.quantity = data.quantity;
    this.unitPrice = data.unitPrice;
    this.isOnSale = data.isOnSale;
    this.total = this.quantity * this.unitPrice;
  }
}
