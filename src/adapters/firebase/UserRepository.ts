import { UserRepository } from "@/ports/out/UserRepository";
import { FirebaseBaseRepositoryAdapter } from "@devjonatas/devkit/adapters";
import { User, UserFields } from "@devjonatas/devkit/models";
import { ModelMapperPort } from "@devjonatas/devkit/ports/middleware";

export class FirebaseUserRepositoryAdapter
  extends FirebaseBaseRepositoryAdapter<User, UserFields>
  implements UserRepository
{
  constructor(mapper: ModelMapperPort<User, UserFields, any>) {
    super(mapper, User);
  }
}
