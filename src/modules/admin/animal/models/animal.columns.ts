import type ColumnProps from "@/common/components/table/types/ColumnProps";
import type { AnimalKingdomModel } from "../../animal_kingdom/models/animal_kingdom.model";

export const columns: ColumnProps[] = [

  {
    field: "name",
    header: "animal.name",
    filter: true,
    sortable: true
  },
  {
    field: "fk_animal_kingdom",
    fieldGetter: (animal) => (animal.animal_kingdom as AnimalKingdomModel)?.name,
    header: "animal.kingdom",
    filter: true,
  },

  {
    field: "actions",
    header: "actions",
    isActionsColumn: true,
    filter: false

  },
];
