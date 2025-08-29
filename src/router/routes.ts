import AdminLayout from "@/layouts/admin/AdminLayout.vue";
import GeneralLayout from "@/layouts/general/GeneralLayout.vue";
import Login from "@/layouts/security/views/login/Login.vue";
import AnimalsManagement from "@/modules/animal/views/AnimalsManagement.vue";
import AnimalKindomsManagement from "@/modules/animal_kingdom/views/AnimalKingdomsManagement.vue";
import NotAuthorized from "@/views/errors/NotAuthorized.vue";
import NotFound from "@/views/errors/NotFound.vue";
import Home from "@/views/home/Home.vue";
import { getRouterArray } from "./utils";

export default [
  {
    path: "/admin",
    name: "admin",
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: getRouterArray()
  },

  {
    path: "/",
    name: "general",
    component: GeneralLayout,

    children: [
      {
        path: "/",
        name: "home",
        component: Home,
        meta: { requiresAuth: true },
      },
      {
        path: "/login",
        name: "login",
        component: Login,
      },
      // {
      //   path: "/sign-up",
      //   name: "sign-up",
      //   component: SignUp,
      // },
      // {
      //   path: "/accept-invitation",
      //   name: "accept-invitation",
      //   component: AcceptInvitation,
      // },
      // {
      //   path: "/set-password",
      //   name: "set-password",
      //   component: SetPassword,
      // },

      // {
      //   path: "/profile",
      //   name: "profile",
      //   component: VProfile,
      //   meta: { requiresAuth: true },
      // },



      // {
      //   path: "/info",
      //   name: "info",
      //   component: VInfo,
      //   meta: { requiresAuth: true },
      // },
      {
        path: "/not-authorized",
        name: "not-authorized",
        component: NotAuthorized,
        meta: { requiresAuth: true },
      },
      {
        path: "/not-found",
        name: "not-found",
        meta: { requiresAuth: true },
        component: NotFound,
      },
    ],
  },

  {
    path: "/:catchAll(.*)",
    redirect: "/not-found",
  },
]
