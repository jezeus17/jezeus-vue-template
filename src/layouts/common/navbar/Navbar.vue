<template>
  <div :class="`${absolute ? 'top-0 left-0 absolute home p-2' : ''} w-full  z-50 `">




    <Menubar :model="items">

      <template #start>
        <RouterLink to="/"
          v-if="router.currentRoute.value.name != 'login' && router.currentRoute.value.name != 'sign-up'" class="flex
          items-center">
          <!-- <img src="/favicon-32x32.png" /> -->
        </RouterLink>
        <slot name="sidebar-button"></slot>
      </template>
      <template #end>
        <div class="flex items-center gap-2">
          <SelectLanguage />
          <ToggleDarkMode />
          <PrimaryColorSelector />
          <UserAvatar v-if="isAuthenticated" />
        </div>
      </template>
    </Menubar>
  </div>


</template>
<script setup lang="ts">
import { onBeforeRouteUpdate, useRouter } from "vue-router";
import Menubar from "primevue/menubar";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";

import UserAvatar from "./components/UserAvatar.vue";
import ToggleDarkMode from "./components/ToggleDarkMode.vue";
import SelectLanguage from "./components/SelectLanguage.vue";
import TokenHandler from "@/common/utils/token-handler";
import PrimaryColorSelector from "./components/PaletteSelector.vue";
import { filterMenuByRole, getNavbarItems, updateNavbarLabels } from "./utils";
const { t, locale } = useI18n();

const props = defineProps({
  absolute: Boolean,
  hideItems: Boolean
})

const router = useRouter();
const isAuthenticated = ref(TokenHandler.getToken() != null)

const menuItems = props.hideItems ? [] : getNavbarItems()





//       {
//         label: " ",
//         i18n: "users",
//         icon: 'pi pi-user',

//         command: () => router.push("/users"),
//         authorize: ['Admin', 'Super Admin', 'Client']
//       },
//     ],
//     authorize: ['Admin', 'Super Admin', 'Analyst', 'Client']
//   },
//   {
//     label: "Analysis",
//     i18n: "reports",

//     authorize: ['Super Admin', 'Analyst', 'Client'],
//     items: [
//       {
//         label: " ",
//         i18n: "results",
//         command: () => router.push("/results"),
//         icon: 'pi pi-list-check',

//         authorize: ['Super Admin', 'Analyst', 'Client'],

//       },


//     ],

//   },
//   {
//     label: " ",
//     i18n: "info",
//     authorize: ['Admin', 'Super Admin', 'Analyst', 'Executor'],


//     command: () => router.push("/info"),
//   },
// ];





const items = ref([]);

const fillNavbarMenu = () => {
  items.value = []
  try {
    // if (isAuthenticated.value) {
    // items.value = filterMenuByRole(menuItems, userStore().getRole)
    // }
    items.value = menuItems

  } catch (error) {
    console.log(error.message)
  }
}




fillNavbarMenu()
updateNavbarLabels(items.value, t);

watch(locale, () => {
  updateNavbarLabels(items.value, t);
});

onBeforeRouteUpdate(async () => {
  isAuthenticated.value = TokenHandler.getToken() != null
  fillNavbarMenu()
  updateNavbarLabels(items.value, t)
})

</script>
<style>
.home .p-menubar {
  background-color: transparent !important;
  border: none !important;
}

.p-menubar {
  border-radius: 12px !important;
}
</style>
