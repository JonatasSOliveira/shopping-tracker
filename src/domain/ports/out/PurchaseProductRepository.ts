import {
  PurchaseProduct,
  PurchaseProductFields,
} from "@/models/PurchaseProduct";
import { BaseRepository } from "./BaseRepository";

export type PurchaseProductRepository = BaseRepository<
  PurchaseProduct,
  PurchaseProductFields
>;
