import { SignUpRequestDTOProps } from "@/dtos/auth/request/SignUp";
import { User, UserFields } from "@devjonatas/devkit/models";
import { UserMapperPort } from "@/ports/middleware/UserMapper";
import { capitalizeWords } from "@devjonatas/devkit/utils";

export class UserMapper implements UserMapperPort {
  public fromDTO(data: any): User {
    throw new Error("Method not implemented.");
  }

  public toDTO(model: User): any {
    throw new Error("Method not implemented.");
  }

  public fromFields(data: UserFields): User {
    return new User({
      ...data,
      name: data.name ? capitalizeWords(data.name) : undefined,
      email: data.email?.toLowerCase().trim(),
    });
  }

  public toFields(model: User): UserFields {
    return {
      id: model.getId(),
      name: model.getName(),
      email: model.getEmail(),
      createdAt: model.getCreatedAt(),
      deletedAt: model.getDeletedAt(),
      updatedAt: model.getUpdatedAt(),
    };
  }

  fromSignUpRequestDTOWithId(
    data: SignUpRequestDTOProps & Required<Pick<UserFields, "id">>,
  ): User {
    return new User({
      id: data.id,
      name: capitalizeWords(data.name),
      email: data.email.toLowerCase().trim(),
    });
  }
}
