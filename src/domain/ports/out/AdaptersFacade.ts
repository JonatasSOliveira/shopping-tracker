import { ProductRepository } from "./ProductRepository";
import { RetailerRepository } from "./RetailerRepository";
import { UserRepository } from "./UserRepository";

export interface AdaptersFacadePortOut {
  getRetailerRepository(): RetailerRepository;
  getUserRepository(): UserRepository;
  getProductRepository(): ProductRepository;
}
