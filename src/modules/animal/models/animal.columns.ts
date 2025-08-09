import type { Animal } from "./animal.model";

export const columns = [

  {
    field: "name",
    header: "animal.name",
    filter: true
  },
  {
    fieldGetter: (animal: Animal) => animal.animal_kingdom?.name,
    header: "animal_kingdom.name",
    filter: true
  },



  {
    field: "actions",
    header: "actions",
    isActionsColumn: true,

  },
];
