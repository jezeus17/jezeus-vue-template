import { schema } from "../schemas/animal.schema";
import { ID, NotSavable, NotSearchable } from "@/common/utils/Decorators";
import { columns } from "./animal.columns";
import { SupabaseModel } from "@/common/models/SupabaseModel";
import type { AnimalKingdom } from "@/modules/management/animal_kingdom/models/animal_kingdom.model";
import { locales } from "../locales/locales";


export class Animal extends SupabaseModel {
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
  animal_kingdom!: AnimalKingdom
  static readonly url: string = "animal";
  static readonly columns = columns;
  static readonly locales = locales;
  static readonly schema = schema;
}
