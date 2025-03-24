import "reflect-metadata";
// Decorator para adicionar as propriedades e métodos
export function Model(tableName: string) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    // Definindo a tabela como metadata
    Reflect.defineMetadata("tableName", tableName, constructor);

    // Adicionando os métodos getters e setters
    Object.defineProperties(constructor.prototype, {
      id: {
        get(this: any) {
          return this._id;
        },
        set(this: any, value: number) {
          this._id = value;
        },
        enumerable: true,
        configurable: true,
      },
      createdAt: {
        get(this: any) {
          return this._createdAt;
        },
        set(this: any, value: Date) {
          this._createdAt = value;
        },
        enumerable: true,
        configurable: true,
      },
      updatedAt: {
        get(this: any) {
          return this._updatedAt;
        },
        set(this: any, value: Date) {
          this._updatedAt = value;
        },
        enumerable: true,
        configurable: true,
      },
      deletedAt: {
        get(this: any) {
          return this._deletedAt;
        },
        set(this: any, value: Date) {
          this._deletedAt = value;
        },
        enumerable: true,
        configurable: true,
      },
    });

    // Criando métodos get e set explicitamente
    constructor.prototype.getId = function () {
      return this._id;
    };

    constructor.prototype.setId = function (value: number) {
      this._id = value;
    };

    constructor.prototype.getCreatedAt = function () {
      return this._createdAt;
    };

    constructor.prototype.setCreatedAt = function (value: Date) {
      this._createdAt = value;
    };

    constructor.prototype.getUpdatedAt = function () {
      return this._updatedAt;
    };

    constructor.prototype.setUpdatedAt = function (value: Date) {
      this._updatedAt = value;
    };

    constructor.prototype.getDeletedAt = function () {
      return this._deletedAt;
    };

    constructor.prototype.setDeletedAt = function (value: Date) {
      this._deletedAt = value;
    };
  };
}