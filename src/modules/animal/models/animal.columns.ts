import type ColumnProps from "@/components/table/types/ColumnProps";
import type { Animal } from "./animal.model";

export const columns: ColumnProps[] = [

  {
    field: "name",
    header: "animal.name",
    filter: true
  },
  {
    field: "fk_animal_kingdom",
    fieldGetter: (animal) => (animal.animal_kingdom as Animal).name,
    header: "animal.kingdom",
    filter: true
  },

  {
    field: "actions",
    header: "actions",
    isActionsColumn: true,
    filter: false

  },
];
