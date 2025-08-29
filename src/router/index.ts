import { createRouter, createWebHistory } from "vue-router";



import routes from "./routes";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth && !isUserAuthenticated()) {
//     next("/login");
//   } else next();
// });
export default router;
