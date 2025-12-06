import type { CustomRouteRecord } from "@/common/router/utils";
import GeneralLayout from "../GeneralLayout.vue";
import NotAuthorized from "../views/errors/NotAuthorized.vue";
import NotFound from "../views/errors/NotFound.vue";
import Home from "../views/home/Home.vue";

export const routes: CustomRouteRecord[] = [
    {
        id: "general",
        path: "/",
        name: "general",
        component: GeneralLayout,
    },
    {
        id: "home",
        path: "/",
        name: "home",
        component: Home,
        parents: ['general']
    },
    {
        id: "not-authorized",
        path: "/not-authorized",
        name: "not-authorized",
        component: NotAuthorized,
        parents: ['general']
    },
    {
        id: "not-found",
        path: "/not-found",
        name: "not-found",
        component: NotFound,
        parents: ['general']
    },
]