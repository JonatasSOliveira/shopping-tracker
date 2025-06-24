import {
  PurchaseProduct,
  PurchaseProductFields,
} from "@/models/PurchaseProduct";
import { BaseRepository } from "@devjonatas/devkit/ports/out";

export type PurchaseProductRepository = BaseRepository<
  PurchaseProduct,
  PurchaseProductFields
>;
