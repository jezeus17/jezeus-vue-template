import type { RouteRecordRaw } from 'vue-router';

interface RouteModule {
  default?: RouteRecordRaw[];
  [key: string]: RouteRecordRaw[] | undefined;
}

export type CustomRouteRecord = { id: string, children?: CustomRouteRecord[], parents?: string[] | null, icon?: string } & RouteRecordRaw

export function getRouterArray() {
  const modules = import.meta.glob<RouteModule>('@/**/*route.ts', { eager: true });

  const routesList: CustomRouteRecord[] = [];

  Object.values(modules).forEach((module) => {
    if (!module) return;


    const exports = Object.values(module).filter(
      (exportItem): exportItem is CustomRouteRecord[] =>
        exportItem !== undefined
    );
    exports.forEach((exportItem) => {
      routesList.push(...exportItem)
    });
  });
  return buildTreeWithParents(routesList)
}


function buildTreeWithParents(items: CustomRouteRecord[]): CustomRouteRecord[] {
  const nodeMap = new Map<string | number, CustomRouteRecord>();
  const rootNodes: CustomRouteRecord[] = [];
  const processedNodes = new Set<string | number>();
  const cycles: { nodeId: string | number; parents: (string | number)[] }[] = [];

  const allIds = new Set(items.map(item => item.id));

  items.forEach(item => {
    const validParents = item.parents?.filter(parentId =>
      parentId !== item.id &&
      allIds.has(parentId)
    ) || [];

    nodeMap.set(item.id, {
      ...item,
      children: [],
      parents: validParents
    });
  });

  items.forEach(item => {
    const checkForCycle = (nodeId: string | number, visited: Set<string | number>): boolean => {
      if (visited.has(nodeId)) {
        return true;
      }

      visited.add(nodeId);
      const node = nodeMap.get(nodeId);
      if (!node?.parents) return false;

      for (const parentId of node.parents) {
        if (checkForCycle(parentId, new Set(visited))) {
          cycles.push({ nodeId: item.id, parents: item.parents || [] });
          return true;
        }
      }

      return false;
    };

    if (item.parents && item.parents.length > 0) {
      checkForCycle(item.id, new Set());
    }
  });

  items.forEach(item => {
    const node = nodeMap.get(item.id)!;
    if (item.parents && item.parents.length > 0) {
      item.parents.forEach(parentId => {
        if (nodeMap.has(parentId) && parentId !== item.id) {
          const parent = nodeMap.get(parentId)!;
          const alreadyChild = parent.children?.some(
            child => child.id === node.id
          );
          if (!alreadyChild) {
            parent.children?.push(node);
            processedNodes.add(node.id);
          }
        }
      });
    }
  });

  items.forEach(item => {
    const node = nodeMap.get(item.id)!;
    const isRoot = !item.parents ||
      item.parents.length === 0 ||
      !item.parents.some(parentId => nodeMap.has(parentId)) ||
      cycles.some(cycle => cycle.nodeId === item.id);
    const alreadyInRoot = rootNodes.some(root => root.id === node.id);
    if (isRoot && !alreadyInRoot) {
      rootNodes.push({
        ...node,
        redirect: (to) => {
          return { name: to.matched[0]?.children[0]?.name ?? '' }
        },
        children: node.children as CustomRouteRecord[]
      });
    }
  });

  return rootNodes
}


// const autorize = (roles: string[]) => {
//   return function (to, from, next) {
//     if (roles.includes(userStore().getRole)) next();
//     else next("/not-authorized");
//   };
// };