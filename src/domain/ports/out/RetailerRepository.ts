import { Retailer, RetailerFields } from "@/models/Retailer";
import { BaseRepository } from "./BaseRepository";

export type RetailerRepository = BaseRepository<Retailer, RetailerFields>;
