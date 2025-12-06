import type { CustomRouteRecord } from "@/common/router/utils";
import AnimalKingdomsList from "../views/AnimalKingdomsList.vue";

export const routes: CustomRouteRecord[] = [
  {
    id: "animal_kingdoms",
    path: "animal_kingdoms",
    name: "animal_kingdoms",
    component: AnimalKingdomsList,
    meta: { requiresAuth: true },
    icon: 'pi pi-crown',
    parents: ['admin']
  }]
