import router from "@/common/router"
import type { RouteRecordNormalized } from "vue-router"

export function filterMenuByRole(menuData, userRole) {
  return menuData
    .filter(section =>
      section.authorize.includes(userRole)
    )
    .map(section => {
      const auxSection = { ...section }
      if (section.items) {
        auxSection['items'] = section.items.filter(item =>
          item.authorize.includes(userRole)
        )
      }
      return auxSection
    })

}

export function getNavbarItems(itemCallback?: () => void): NavbarItem[] {
  const adminRoute = router.getRoutes().find(route => route.name == 'admin')
  if (adminRoute) {
    return [{
      label: "Management",
      i18n: "management",
      items: adminRoute?.children.map((route) => {
        return {
          title: 'title',
          label: route.name as string,
          i18n: route.name as string,
          command: () => {
            if (itemCallback)
              itemCallback()
            router.push('/admin/' + route.path)
          },
          icon: route.icon as string,

          authorize: ['Super Admin', 'Analyst']
        }
      }),
    }]
  }

  else

    return []



}



export function updateNavbarLabels(items: NavbarItem[], t: (arg0: string) => string) {
  items.forEach((item) => {
    if (item.label) {
      item.label = t(`navbar.${item.i18n}.name`);
    }
    if (item.items) {
      item.items.forEach((subItem) => {
        subItem.label = t(`navbar.${item.i18n}.${subItem.i18n}`);
      });
    }
  });
};

interface NavbarItem {
  label: string,
  i18n: string,
  command: () => Promise<void>,
  icon: string,
  authorize: string[],
  items?: NavbarItem[],
  separator?: boolean,
}
