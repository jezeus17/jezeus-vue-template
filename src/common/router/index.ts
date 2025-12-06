import { createRouter, createWebHistory } from "vue-router";
import { generateRoutes } from "./utils";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: generateRoutes()
});


export default router;


// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth && !isUserAuthenticated()) {
//     next("/login");
//   } else next();
// });