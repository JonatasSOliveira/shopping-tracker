import { SQLiteQueryExecutor } from "@/infra/SQLite/QueryExecutor";
import { SQLiteRetailerRepositoryAdapter } from "./RetailerRepository";
import { AdaptersFacadePortOut } from "@/ports/out/AdaptersFacade";
import { SQLiteUserRepositoryAdapter } from "./UserRepository";
import { RetailerMapper } from "domain/mappers/Retailer";
import { SQLiteProductRepositoryAdapter } from "./ProductRepository";
import { ProductMapper } from "domain/mappers/Product";

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

  public getRetailerRepository = () => this.retailerRepository;
  public getUserRepository = () => this.userRepository;
  public getProductRepository = () => this.productRepository;
}
