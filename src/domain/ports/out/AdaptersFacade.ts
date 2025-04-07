import { RetailerRepository } from "./RetailerRepository";
import { UserRepository } from "./UserRepository";

export interface AdaptersFacadePortOut {
  getRetailerRepository(): RetailerRepository;
  getUserRepository(): UserRepository;
}
