import { schema } from "../schemas/animal.schema";
import { ID, NotSavable } from "@/common/utils/Decorators";
import { columns } from "./animal.columns";
import { SupabaseModel } from "@/common/models/SupabaseModel";
import type { AnimalKingdom } from "@/modules/animal_kingdom/models/animal_kingdom.model";
import { locales } from "../locales/locales";


export class Animal extends SupabaseModel {
  @ID
  id!: number;
  @NotSavable
  created_at!: string;
  name!: string;
  fk_animal_kingdom!: number
  animal_kingdom!: AnimalKingdom
  static readonly url: string = "animal";
  static readonly columns = columns;
  static readonly locales = locales;
  static readonly schema = schema;
}
