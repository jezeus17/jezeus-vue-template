<template>

  <div class="card flex  justify-center h-screen ">


    <Menu :model="items" class="h-full overflow-auto">
      <template #start>
        <RouterLink to="/"><span
            class="inline-flex w-full h-20 justify-center items-center gap-1 text-2xl text-primary   ">
            <i class="pi pi-prime" style="font-size: 1.8rem;"></i> Template
          </span></RouterLink>

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
import { getNavbarItems, updateNavbarLabels } from "@/components/navbar/utils";
import Menu from "primevue/menu";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

const emit = defineEmits(['close'])

const items = ref(
  [
    ...getNavbarItems(() => emit('close')),

  ])

updateNavbarLabels(items.value, t);

watch(locale, () => {
  updateNavbarLabels(items.value, t);
});
</script>
