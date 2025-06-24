import { User, UserFields } from "@devjonatas/devkit/models";
import { ModelMapperPort } from "./Mapper";
import { SignUpRequestDTOProps } from "@/dtos/auth/request/SignUp";

export interface UserMapperPort extends ModelMapperPort<User, UserFields, any> {
  fromSignUpRequestDTOWithId(
    data: SignUpRequestDTOProps & Required<Pick<UserFields, "id">>,
  ): User;
}
