import { schema } from "../schemas/animal_kingdom.schema";
import { ID, NotSavable, NotSearchable } from "@/common/utils/Decorators";
import { columns } from "./animal_kingdom.columns";
import { SupabaseModel } from "@/common/models/SupabaseModel";
import { locales } from "../locales/locales";


export class AnimalKingdom extends SupabaseModel {
  @ID
  id!: number;
  @NotSavable
  @NotSearchable
  created_at!: string;
  name!: string;

  static readonly url: string = "animal_kingdom";
  static readonly columns = columns;
  static readonly schema = schema;
  static readonly locales = locales
}
