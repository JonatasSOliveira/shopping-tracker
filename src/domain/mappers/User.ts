import { User, UserFields } from "@/models/User";
import { ModelMapperPort } from "@/ports/middleware/Mapper";

export class UserMapper implements ModelMapperPort<User, UserFields, any> {
  public fromDTO(data: any): User {
    throw new Error("Method not implemented.");
  }

  public toDTO(model: User): any {
    throw new Error("Method not implemented.");
  }

  public fromFields(data: UserFields): User {
    return new User(data);
  }

  public toFields(model: User): UserFields {
    return {
      name: model.getName(),
      email: model.getEmail(),
    };
  }
}
