import { User, UserFields } from "@devjonatas/devkit/models";
import { BaseRepository } from "@devjonatas/devkit/ports/out";

export type UserRepository = BaseRepository<User, UserFields>;
