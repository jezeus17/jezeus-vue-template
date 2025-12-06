import { Validation } from "@/common/utils/models/base/Validation";
import { object, string } from "yup";

const schema = object({
  name: string().required()
});
export default class AnimalKingdomValidation extends Validation {
  static create = schema
  static update = schema
}