import { DTOValidatorMiddlewarePort } from "@ports/middleware/DTOValidator";

export class DTOValidatorService implements DTOValidatorMiddlewarePort {
  public validate(dto: object): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
