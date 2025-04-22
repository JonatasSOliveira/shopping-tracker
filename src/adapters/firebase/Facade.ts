import { FirebaseProvider } from "@/infra/firebase/Provider";
import { AdaptersFacadePortOut } from "@/ports/out/AdaptersFacade";
import { RetailerRepository } from "@/ports/out/RetailerRepository";
import { FirebaseRetailerRepositoryAdapter } from "./RetailerRepository";
import { RetailerMapper } from "domain/mappers/Retailer";
import { Firestore } from "firebase/firestore";
import { ProductRepository } from "@/ports/out/ProductRepository";
import { FirebaseProductRepositoryAdapter } from "./ProductRepository";
import { ProductMapper } from "domain/mappers/Product";
import { PurchaseRepository } from "@/ports/out/PurchaseRepository";
import { FirebasePurchaseRepositoryAdapter } from "./PurchaseRepository";
import { PurchaseMapper } from "domain/mappers/Purchase";

export class FirebaseAdaptersFacade implements AdaptersFacadePortOut {
  private firestore: Firestore = FirebaseProvider.getFirestore();
  private retailerRepository: RetailerRepository =
    new FirebaseRetailerRepositoryAdapter(this.firestore, new RetailerMapper());
  private productRepository: ProductRepository =
    new FirebaseProductRepositoryAdapter(this.firestore, new ProductMapper());
  private purchaseRepository: PurchaseRepository =
    new FirebasePurchaseRepositoryAdapter(this.firestore, new PurchaseMapper());

  public getRetailerRepository(): RetailerRepository {
    return this.retailerRepository;
  }

  public getProductRepository(): ProductRepository {
    return this.productRepository;
  }

  public getPurchaseRepository(): PurchaseRepository {
    return this.purchaseRepository;
  }
}
