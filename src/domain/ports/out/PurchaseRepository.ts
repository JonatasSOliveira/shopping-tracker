import { Purchase, PurchaseFields } from "@/models/Purchase";
import { BaseRepository } from "@devjonatas/devkit/ports/out";

export type PurchaseRepository = BaseRepository<Purchase, PurchaseFields>;
