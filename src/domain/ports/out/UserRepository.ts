import { User } from "@models/User";
import { Where } from "@types/repositories/Where";

export interface UserRepository {
  list(): Promise<User[]>;
  listOne(options: { where: Where<User> }): Promise<User>;
  create(data: Partial<User>): Promise<User>;
}
