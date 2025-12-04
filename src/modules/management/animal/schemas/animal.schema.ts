import { object, string } from "yup";

export const schema = object({
  name: string().required(),
  fk_animal_kingdom: string().required()
});
