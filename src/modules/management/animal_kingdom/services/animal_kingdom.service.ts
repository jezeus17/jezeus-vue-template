import { SupabaseService } from "@/common/models/supabase/SupabaseService";
import { AnimalKingdomModel } from "../models/animal_kingdom.model";

export class AnimalKingdomService extends SupabaseService<AnimalKingdomModel> {
    static readonly url: string = "animal_kingdom";
}