import AnimalsManagement from "../views/AnimalsManagement.vue";

export default [
  {
    path: "/animals",
    name: "animals",
    component: AnimalsManagement,
    meta: { requiresAuth: true },
    icon: 'pi pi-star'
  },
]
