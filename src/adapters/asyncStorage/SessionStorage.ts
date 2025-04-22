import { UserSessionDTO } from "@/dtos/user/Session";
import { SessionStoragePortOut } from "@/ports/out/SessionStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class AsyncStorageSessionAdapter implements SessionStoragePortOut {
  private key = "session:data";

  public async save(session: UserSessionDTO): Promise<void> {
    await AsyncStorage.setItem(this.key, JSON.stringify(session));
  }

  public async get(): Promise<UserSessionDTO> {
    const session = await AsyncStorage.getItem(this.key);

    if (!session) {
      throw new Error("Session not found");
    }

    return JSON.parse(session);
  }
}
