<template>

    <div class="card flex  justify-center h-screen ">


        <Menu :model="items" class="h-full overflow-auto">
            <template #start>
                <span class="inline-flex w-full justify-center items-center gap-1 py-2">
                    <!-- <img src="/img/logo.png" w-24/> -->
                </span>
            </template>
            <template #item="{ item, props }">
                <a v-ripple class="flex items-center" v-bind="props.action">
                    <span :class="item.icon" />
                    <span>{{ item.label }}</span>

                </a>
            </template>

        </Menu>

    </div>
</template>
<script setup lang="ts">
import { siteStore } from "@/common/site/siteStore";
import { getNavbarItems, updateNavbarLabels } from "@/layouts/common/navbar/utils";
import Menu from "primevue/menu";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

const emit = defineEmits(['close'])

const items = ref(
    [
        ...getNavbarItems(() => emit('close')),
        { separator: true },
        {
            label: ' ',
            i18n: 'profile',
            items: [

                {
                    label: ' ',
                    i18n: 'close-session',
                    icon: 'pi pi-sign-out',
                    command: () => siteStore().logout()
                }
            ]
        }
    ])

updateNavbarLabels(items.value, t);

watch(locale, () => {
    updateNavbarLabels(items.value, t);
});
</script>
<style>
.p-menu-submenu-label {
    margin-top: 1rem !important;
}
</style>
