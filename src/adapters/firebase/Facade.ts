import { AdaptersFacadePortOut } from "@/ports/out/AdaptersFacade";
import { RetailerRepository } from "@/ports/out/RetailerRepository";
import { FirebaseRetailerRepositoryAdapter } from "./RetailerRepository";
import { RetailerMapper } from "domain/mappers/Retailer";
import { ProductRepository } from "@/ports/out/ProductRepository";
import { FirebaseProductRepositoryAdapter } from "./ProductRepository";
import { ProductMapper } from "domain/mappers/Product";
import { PurchaseRepository } from "@/ports/out/PurchaseRepository";
import { FirebasePurchaseRepositoryAdapter } from "./PurchaseRepository";
import { PurchaseMapper } from "domain/mappers/Purchase";
import { UserRepository } from "@/ports/out/UserRepository";
import { FirebaseUserRepositoryAdapter } from "./UserRepository";
import { UserMapper } from "domain/mappers/User";

export class FirebaseAdaptersFacade implements AdaptersFacadePortOut {
  private retailerRepository: RetailerRepository =
    new FirebaseRetailerRepositoryAdapter(new RetailerMapper());
  private productRepository: ProductRepository =
    new FirebaseProductRepositoryAdapter(new ProductMapper());
  private purchaseRepository: PurchaseRepository =
    new FirebasePurchaseRepositoryAdapter(new PurchaseMapper());
  private userRepository: UserRepository = new FirebaseUserRepositoryAdapter(
    new UserMapper(),
  );

  public getRetailerRepository(): RetailerRepository {
    return this.retailerRepository;
  }

  public getProductRepository(): ProductRepository {
    return this.productRepository;
  }

  public getPurchaseRepository(): PurchaseRepository {
    return this.purchaseRepository;
  }

  public getUserRepository(): UserRepository {
    return this.userRepository;
  }
}
