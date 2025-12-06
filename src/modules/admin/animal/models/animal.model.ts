import { ForeignKey, ID, Label, NotSavable, NotSearchable } from "@/common/utils/Decorators";
import { columns } from "./animal.columns";
import { locales } from "./animal.locales";
import { AnimalKingdomModel } from "../../animal_kingdom/models/animal_kingdom.model";
import { SupabaseModel } from "@/common/utils/models/supabase/SupabaseModel";
import AnimalValidation from "./animal.validation";

export class AnimalModel extends SupabaseModel {
  @ID
  id!: string;
  @NotSavable
  @NotSearchable
  created_at!: string;
  @Label
  name!: string;
  @NotSearchable
  @ForeignKey(AnimalKingdomModel)
  fk_animal_kingdom!: string
  @NotSavable
  @NotSearchable
  animal_kingdom!: AnimalKingdomModel
  static readonly columns = columns;
  static readonly locales = locales;
  static readonly validation = AnimalValidation;
  static readonly url: string = "animal";

}
