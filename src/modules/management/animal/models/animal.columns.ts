import type ColumnProps from "@/components/table/types/ColumnProps";
import type { Animal } from "./animal.model";

export const columns: ColumnProps[] = [

  {
    field: "name",
    header: "animal.name",
    filter: false
  },
  {
    field: "fk_animal_kingdom",
    fieldGetter: (animal) => (animal.animal_kingdom as Animal).name,
    header: "animal.kingdom",
    filter: false
  },

  {
    field: "actions",
    header: "actions",
    isActionsColumn: true,
    filter: false

  },
];
