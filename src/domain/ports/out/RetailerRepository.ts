import { Retailer, RetailerFields } from "@/models/Retailer";
import { BaseRepository } from "@devjonatas/devkit/ports/out";

export type RetailerRepository = BaseRepository<Retailer, RetailerFields>;
