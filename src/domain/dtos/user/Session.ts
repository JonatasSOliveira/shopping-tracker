import { UserFields } from "@/models/User";

export type UserSessionDTO = Required<
  Pick<UserFields, "id" | "name" | "email">
>;
