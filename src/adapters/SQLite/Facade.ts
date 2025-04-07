import { SQLiteQueryExecutor } from "@/infra/SQLite/QueryExecutor";
import { SQLiteRetailerRepositoryAdapter } from "./RetailerRepository";
import { AdaptersFacadePortOut } from "@/ports/out/AdaptersFacade";
import { SQLiteUserRepositoryAdapter } from "./UserRepository";

export class SQLiteAdaptersFacade implements AdaptersFacadePortOut {
  private sqliteQueryExecutor = new SQLiteQueryExecutor();
  private retailerRepository = new SQLiteRetailerRepositoryAdapter(
    this.sqliteQueryExecutor,
  );
  private userRepository = new SQLiteUserRepositoryAdapter();

  public getRetailerRepository() {
    return this.retailerRepository;
  }

  public getUserRepository() {
    return this.userRepository;
  }
}
