import { schema } from "../schemas/animal_kingdom.schema";
import { ID, Label, NotSavable, NotSearchable, Unique } from "@/common/utils/Decorators";
import { columns } from "./animal_kingdom.columns";
import { locales } from "../locales/locales";
import { SupabaseModel } from "@/common/models/supabase/SupabaseModel";

export class AnimalKingdomModel extends SupabaseModel {
  @ID
  id!: number;
  @NotSavable
  @NotSearchable
  created_at!: string;
  @Unique
  @Label
  name!: string;
  static readonly columns = columns;
  static readonly schema = schema;
  static readonly locales = locales;
  static readonly url: string = "animal_kingdom"

}
