import { UserRepository } from "@/ports/out/UserRepository";
import { FirebaseBaseRepositoryAdapter } from "./BaseRepository";
import { User, UserFields } from "@/models/User";
import { ModelMapperPort } from "@/ports/middleware/Mapper";

export class FirebaseUserRepositoryAdapter
  extends FirebaseBaseRepositoryAdapter<User, UserFields>
  implements UserRepository
{
  constructor(mapper: ModelMapperPort<User, UserFields, any>) {
    super(mapper, User);
  }
}
