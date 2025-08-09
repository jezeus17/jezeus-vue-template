import { schema } from "../schemas/animal_kingdom.schema";
import { ID, NotSavable } from "@/common/utils/Decorators";
import { columns } from "./animal_kingdom.columns";
import { SupabaseModel } from "@/common/utils/models/SupabaseModel";


export class AnimalKingdom extends SupabaseModel {
  @ID
  id!: number;
  @NotSavable
  created_at!: string;
  name!: string;

  static readonly url: string = "animal_kingdom";
  static readonly columns = columns;
  static readonly schema = schema;
}
