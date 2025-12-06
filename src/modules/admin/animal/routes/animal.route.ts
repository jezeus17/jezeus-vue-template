import type { CustomRouteRecord } from "@/common/router/utils";
import AnimalsList from "../views/AnimalsList.vue";

export const routes: CustomRouteRecord[] = [
  {
    id: "animals",
    path: "animals",
    name: "animals",
    component: AnimalsList,
    meta: { requiresAuth: true },
    icon: 'pi pi-star',
    parents: ['admin']
  },
]
