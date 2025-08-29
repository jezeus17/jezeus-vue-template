import type { RouteRecordRaw } from 'vue-router';

interface RouteModule {
  default?: RouteRecordRaw | RouteRecordRaw[];
  [key: string]: RouteRecordRaw | RouteRecordRaw[] | undefined;
}

export function getRouterArray() {
  const modules = import.meta.glob<RouteModule>('@/**/*route.ts', { eager: true });

  const routerArray: RouteRecordRaw[] = [];

  Object.values(modules).forEach((module) => {
    if (!module) return;

    const exports = Object.values(module).filter(
      (exportItem): exportItem is RouteRecordRaw | RouteRecordRaw[] =>
        exportItem !== undefined
    );
    exports.forEach((exportItem) => {
      if (Array.isArray(exportItem)) {
        routerArray.push(...exportItem);
      } else {
        routerArray.push(exportItem);
      }
    });
  });
  return routerArray
}
// const autorize = (roles: string[]) => {
//   return function (to, from, next) {
//     if (roles.includes(userStore().getRole)) next();
//     else next("/not-authorized");
//   };
// };
