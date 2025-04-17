export interface ModelMapperPort<Model, ModelFields, DTO> {
  fromDTO(data: DTO): Model;
  toDTO(model: Model): DTO;
  fromFields(data: ModelFields): Model;
}
