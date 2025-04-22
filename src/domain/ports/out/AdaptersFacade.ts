import { ProductRepository } from "./ProductRepository";
import { RetailerRepository } from "./RetailerRepository";
import { PurchaseRepository } from "./PurchaseRepository";

export interface AdaptersFacadePortOut {
  getRetailerRepository(): RetailerRepository;
  getProductRepository(): ProductRepository;
  getPurchaseRepository(): PurchaseRepository;
}
