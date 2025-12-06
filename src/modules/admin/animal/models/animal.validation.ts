import { Validation } from "@/common/utils/models/base/Validation";
import { object, string } from "yup";

const schema = object({
  name: string().required(),
  fk_animal_kingdom: string().required()
});

export default class AnimalValidation extends Validation {
  static create = schema
  static update = schema
}
