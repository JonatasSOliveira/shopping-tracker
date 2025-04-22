import { User, UserFields } from "@/models/User";
import { BaseRepository } from "./BaseRepository";

export type UserRepository = BaseRepository<User, UserFields>;
