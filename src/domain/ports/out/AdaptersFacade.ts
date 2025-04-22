import { ProductRepository } from "./ProductRepository";
import { RetailerRepository } from "./RetailerRepository";
import { PurchaseRepository } from "./PurchaseRepository";
import { UserRepository } from "./UserRepository";

export interface AdaptersFacadePortOut {
  getRetailerRepository(): RetailerRepository;
  getProductRepository(): ProductRepository;
  getPurchaseRepository(): PurchaseRepository;
  getUserRepository(): UserRepository;
}
