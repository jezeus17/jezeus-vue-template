import type { CustomRouteRecord } from "@/common/router/utils";
import AdminLayout from "../AdminLayout.vue";

export const routes: CustomRouteRecord[] = [
    {
        id: "admin",
        path: "/admin",
        name: "admin",
        component: AdminLayout,
        meta: { requiresAuth: true },
    },
]