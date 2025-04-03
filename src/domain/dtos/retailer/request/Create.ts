import { Required } from "@decorators/Required";

interface RetailerCreateDTOProps {
  name: string
}

export class RetailerCreateDTO implements RetailerCreateDTOProps {
  @Required
  public name: string
  
  constructor({name}:RetailerCreateDTOProps ) {
    this.name = name;
  }
}