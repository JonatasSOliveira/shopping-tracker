import { Purchase, PurchaseFields } from "@/models/Purchase";
import { BaseRepository } from "./BaseRepository";

export type PurchaseRepository = BaseRepository<Purchase, PurchaseFields>;