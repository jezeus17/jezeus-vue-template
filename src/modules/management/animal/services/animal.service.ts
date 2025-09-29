import { SupabaseService } from "@/common/models/supabase/SupabaseService";
import type { AnimalModel } from "../models/animal.model";

export class AnimalService extends SupabaseService<AnimalModel> {
    static readonly url: string = "animal";
}