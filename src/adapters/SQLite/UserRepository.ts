import { User } from "@/models/User";
import { UserRepository } from "@/ports/out/UserRepository";
import { Where } from "@/types/repositories/Where";

export class SQLiteUserRepositoryAdapter implements UserRepository {
  create(data: Partial<User>): Promise<User> {
    throw new Error("Method not implemented.");
  }

  list(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }

  listOne(options: { where: Where<User> }): Promise<User> {
    throw new Error("Method not implemented.");
  }
}
