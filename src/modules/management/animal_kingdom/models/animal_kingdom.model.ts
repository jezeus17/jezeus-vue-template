import { schema } from "../schemas/animal_kingdom.schema";
import { ID, NotSavable, NotSearchable, Unique } from "@/common/utils/Decorators";
import { columns } from "./animal_kingdom.columns";
import { locales } from "../locales/locales";
import { BaseModel } from "@/common/models/base/BaseModel";

export class AnimalKingdomModel extends BaseModel {
  @ID
  id!: number;
  @NotSavable
  @NotSearchable
  created_at!: string;
  @Unique
  name!: string;
  static readonly columns = columns;
  static readonly schema = schema;
  static readonly locales = locales
}
