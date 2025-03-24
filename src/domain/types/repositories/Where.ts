export type Where<Model> = {
  [Key in keyof Model]?: Model[Key];
};
