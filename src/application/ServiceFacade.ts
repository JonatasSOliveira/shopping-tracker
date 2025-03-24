import { SQLiteUserRepositoryAdapter } from "@adapters/SQLite/UserRepository";
import { AuthPortIn } from "@ports/in/Auth";
import { AuthService } from "@services/Auth";
import { DTOValidatorService } from "@services/DTOValidator";

export class ServiceFacade {
  private static authService: AuthPortIn;

  public static getAuth() {
    if (!this.authService) {
      this.authService = new AuthService(
        new SQLiteUserRepositoryAdapter(),
        new DTOValidatorService(),
      );
    }
    return this.authService;
  }
}
