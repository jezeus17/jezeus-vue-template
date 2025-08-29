import AnimalKingdomsManagement from "../views/AnimalKingdomsManagement.vue";

export default [{
  path: "/animal_kingdoms",
  name: "animal_kingdoms",
  component: AnimalKingdomsManagement,
  meta: { requiresAuth: true },
  icon: 'pi pi-crown'

}]
