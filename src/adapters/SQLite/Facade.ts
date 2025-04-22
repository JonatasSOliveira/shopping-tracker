import { SQLiteQueryExecutor } from "@/infra/SQLite/QueryExecutor";
import { SQLiteRetailerRepositoryAdapter } from "./RetailerRepository";
import { SQLiteUserRepositoryAdapter } from "./UserRepository";
import { SQLiteProductRepositoryAdapter } from "./ProductRepository";
import { SQLitePurchaseRepositoryAdapter } from "./PurchaseRepository";
import { AdaptersFacadePortOut } from "@/ports/out/AdaptersFacade";

import { RetailerMapper } from "domain/mappers/Retailer";
import { ProductMapper } from "domain/mappers/Product";
import { PurchaseMapper } from "domain/mappers/Purchase";

export class SQLiteAdaptersFacade implements AdaptersFacadePortOut {
  private sqliteQueryExecutor = new SQLiteQueryExecutor();

  private retailerRepository = new SQLiteRetailerRepositoryAdapter(
    this.sqliteQueryExecutor,
    new RetailerMapper(),
  );

  private userRepository = new SQLiteUserRepositoryAdapter();

  private productRepository = new SQLiteProductRepositoryAdapter(
    this.sqliteQueryExecutor,
    new ProductMapper(),
  );

  private purchaseRepository = new SQLitePurchaseRepositoryAdapter(
    this.sqliteQueryExecutor,
    new PurchaseMapper(),
  );

  public getRetailerRepository() {
    return this.retailerRepository;
  }
  public getUserRepository() {
    return this.userRepository;
  }
  public getProductRepository() {
    return this.productRepository;
  }
  public getPurchaseRepository() {
    return this.purchaseRepository;
  }
}
