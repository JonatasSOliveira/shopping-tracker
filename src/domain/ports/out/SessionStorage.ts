import { UserSessionDTO } from "@/dtos/user/Session";

export interface SessionStoragePortOut {
  save(session: UserSessionDTO): Promise<void>;
  get(): Promise<UserSessionDTO>;
}
