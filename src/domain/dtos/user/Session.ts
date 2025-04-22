import { UserFields } from "@/models/User";

export type UserSessionDTO = Pick<UserFields, "name" | "email">;
