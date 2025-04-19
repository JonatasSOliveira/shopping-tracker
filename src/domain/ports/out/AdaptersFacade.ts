import { ProductRepository } from "./ProductRepository";
import { RetailerRepository } from "./RetailerRepository";
import { UserRepository } from "./UserRepository";
import { PurchaseRepository } from "./PurchaseRepository";

export interface AdaptersFacadePortOut {
  getRetailerRepository(): RetailerRepository;
  getUserRepository(): UserRepository;
  getProductRepository(): ProductRepository;
  getPurchaseRepository(): PurchaseRepository;
}