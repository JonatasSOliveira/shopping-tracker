import { SQLiteQueryExecutor } from "@/infra/SQLite/QueryExecutor";
import { SQLiteRetailerRepositoryAdapter } from "./RetailerRepository";
import { SQLiteProductRepositoryAdapter } from "./ProductRepository";
import { SQLitePurchaseRepositoryAdapter } from "./PurchaseRepository";
import { AdaptersFacadePortOut } from "@/ports/out/AdaptersFacade";

import { RetailerMapper } from "domain/mappers/Retailer";
import { ProductMapper } from "domain/mappers/Product";
import { PurchaseMapper } from "domain/mappers/Purchase";
import { SQLiteUserRepositoryAdapter } from "./UserRepository";
import { UserMapper } from "domain/mappers/User";

export class SQLiteAdaptersFacade implements AdaptersFacadePortOut {
  private sqliteQueryExecutor = new SQLiteQueryExecutor();
  private retailerRepository = new SQLiteRetailerRepositoryAdapter(
    this.sqliteQueryExecutor,
    new RetailerMapper(),
  );
  private productRepository = new SQLiteProductRepositoryAdapter(
    this.sqliteQueryExecutor,
    new ProductMapper(),
  );
  private purchaseRepository = new SQLitePurchaseRepositoryAdapter(
    this.sqliteQueryExecutor,
    new PurchaseMapper(),
  );
  private userRepository = new SQLiteUserRepositoryAdapter(
    this.sqliteQueryExecutor,
    new UserMapper(),
  );

  public getRetailerRepository() {
    return this.retailerRepository;
  }

  public getProductRepository() {
    return this.productRepository;
  }
  public getPurchaseRepository() {
    return this.purchaseRepository;
  }

  public getUserRepository() {
    return this.userRepository;
  }
}
