import { UserRepository } from "@/ports/out/UserRepository";
import { FirebaseBaseRepositoryAdapter } from "./BaseRepository";
import { User, UserFields } from "@/models/User";
import { Firestore } from "firebase/firestore";
import { ModelMapperPort } from "@/ports/middleware/Mapper";

export class FirebaseUserRepositoryAdapter
  extends FirebaseBaseRepositoryAdapter<User, UserFields>
  implements UserRepository
{
  constructor(
    firestore: Firestore,
    mapper: ModelMapperPort<User, UserFields, any>,
  ) {
    super(firestore, mapper, User);
  }
}
