import "reflect-metadata";

export function Model(tableName: string) {
  return function <T extends { new (...args: unknown[]): object }>(
    constructor: T,
  ) {
    Reflect.defineMetadata("tableName", tableName, constructor);

    // Tipando corretamente o protótipo da instância
    Object.defineProperties(constructor.prototype, {
      id: {
        get(this: { _id?: number }) {
          return this._id;
        },
        set(this: { _id?: number }, value: number) {
          this._id = value;
        },
        enumerable: true,
        configurable: true,
      },
      createdAt: {
        get(this: { _createdAt?: Date }) {
          return this._createdAt;
        },
        set(this: { _createdAt?: Date }, value: Date) {
          this._createdAt = value;
        },
        enumerable: true,
        configurable: true,
      },
      updatedAt: {
        get(this: { _updatedAt?: Date }) {
          return this._updatedAt;
        },
        set(this: { _updatedAt?: Date }, value: Date) {
          this._updatedAt = value;
        },
        enumerable: true,
        configurable: true,
      },
      deletedAt: {
        get(this: { _deletedAt?: Date }) {
          return this._deletedAt;
        },
        set(this: { _deletedAt?: Date }, value: Date) {
          this._deletedAt = value;
        },
        enumerable: true,
        configurable: true,
      },
    });

    // Tipando os métodos no protótipo
    constructor.prototype.getId = function (this: { _id?: number }) {
      return this._id;
    };

    constructor.prototype.setId = function (
      this: { _id?: number },
      value: number,
    ) {
      this._id = value;
    };

    constructor.prototype.getCreatedAt = function (this: {
      _createdAt?: Date;
    }) {
      return this._createdAt;
    };

    constructor.prototype.setCreatedAt = function (
      this: { _createdAt?: Date },
      value: Date,
    ) {
      this._createdAt = value;
    };

    constructor.prototype.getUpdatedAt = function (this: {
      _updatedAt?: Date;
    }) {
      return this._updatedAt;
    };

    constructor.prototype.setUpdatedAt = function (
      this: { _updatedAt?: Date },
      value: Date,
    ) {
      this._updatedAt = value;
    };

    constructor.prototype.getDeletedAt = function (this: {
      _deletedAt?: Date;
    }) {
      return this._deletedAt;
    };

    constructor.prototype.setDeletedAt = function (
      this: { _deletedAt?: Date },
      value: Date,
    ) {
      this._deletedAt = value;
    };
  };
}
