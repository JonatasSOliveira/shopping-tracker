import { UserFields } from "@devjonatas/devkit/models";

export type UserSessionDTO = Required<
  Pick<UserFields, "id" | "name" | "email">
>;
