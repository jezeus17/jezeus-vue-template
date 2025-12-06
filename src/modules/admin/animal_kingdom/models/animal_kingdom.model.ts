import AnimalKingdomValidation from "./animal_kingdom.validation";
import { ID, Label, NotSavable, NotSearchable, Unique } from "@/common/utils/Decorators";
import { columns } from "./animal_kingdom.columns";
import { locales } from "./animal_kingdom.locales";
import { SupabaseModel } from "@/common/utils/models/supabase/SupabaseModel";

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
  static readonly validation = AnimalKingdomValidation;
  static readonly locales = locales;
  static readonly url: string = "animal_kingdom"

}
