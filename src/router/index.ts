import { createRouter, createWebHistory } from "vue-router";



import { userStore } from "@/stores/user-store";

import { isUserAuthenticated } from "@/layouts/security/isUserAuthenticated";
import routes from "./routes";

const autorize = (roles: string[]) => {
  return function (to, from, next) {
    if (roles.includes(userStore().getRole)) next();
    else next("/not-authorized");
  };
};
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
