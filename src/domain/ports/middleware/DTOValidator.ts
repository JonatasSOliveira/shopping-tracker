export interface DTOValidatorMiddlewarePort {
  validate(dto: object): Promise<void>;
}
