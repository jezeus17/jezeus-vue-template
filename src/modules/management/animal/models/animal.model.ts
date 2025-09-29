import { schema } from "../schemas/animal.schema";
import { ID, NotSavable, NotSearchable } from "@/common/utils/Decorators";
import { columns } from "./animal.columns";
import { locales } from "../locales/locales";
import { BaseModel } from "@/common/models/base/BaseModel";
import type { AnimalKingdomModel } from "../../animal_kingdom/models/animal_kingdom.model";

export class AnimalModel extends BaseModel {
  @ID
  id!: number;
  @NotSavable
  @NotSearchable
  created_at!: string;
  name!: string;
  @NotSearchable
  fk_animal_kingdom!: number
  @NotSavable
  @NotSearchable
  animal_kingdom!: AnimalKingdomModel
  static readonly columns = columns;
  static readonly locales = locales;
  static readonly schema = schema;
}
