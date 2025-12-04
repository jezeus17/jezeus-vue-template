<template>
  <div class="flex flex-col gap-4 mb-4">
    <h1 class="text-xl !m-0 font-semibold">{{ title ?? t('title') }}</h1>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      <Card v-if="showTotalCard"
        class="border overflow-x-auto overflow-y-hidden border-solid border-[var(--p-menubar-border-color)]">
        <template #content>
          <div class="flex items-center gap-4">
            <i class="pi pi-list text-primary"></i>
            <div>
              <p class="!font-bold text-lg">Total</p>
              <NumberFlow class="text-2xl" :value="dataLenght" />
            </div>
          </div>
        </template>
      </Card>
      <slot name="statistics-cards"></slot>
    </div>
    <div class="flex w-full justify-between gap-4 flex-wrap">
      <IconField>
        <InputIcon>
          <i class="pi pi-search" />
        </InputIcon>
        <InputText class="w-[12rem] lg:w-[20rem]" v-model="searchQuery" :placeholder="$t('global.search')" />
      </IconField>
      <slot name="header"></slot>
      <div class="flex gap-2">
        <CreateButton v-if="!hideCreateButton" :disabled="isPending || isRefetching || isError" />

        <Button icon="pi pi-refresh" v-tooltip="$t('global.refresh')" :disabled="isPending || isRefetching"
          variant="outlined" @click="refetch()" />
        <!-- <Button icon="pi pi-download" variant="outlined" @click="toggle" aria-haspopup="true" :disabled="isPending || isRefetching"
          aria-controls="overlay_menu" />
        <Menu ref="menu" id="overlay_menu" :model="exportOptions" :popup="true" /> -->
        <Button icon="pi pi-th-large" v-if="paginate && !hideChangeMode" v-tooltip="$t('global.change-mode')"
          variant="outlined" @click="dataMode = dataMode == 'cards' ? 'table' : 'cards'"
          :disabled="isPending || isRefetching || isError" />
        <slot name="additional-general-actions"></slot>

      </div>

    </div>
  </div>

</template>

<script lang="ts" setup>
import { Button, Card, IconField, InputIcon, InputText } from 'primevue';
import NumberFlow from '@number-flow/vue'
import { computed, inject, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import CreateButton from './create/CreateButton.vue';
import type { TableProps } from '../types/TableProps';
import type { TableMetadata } from '../composable/useTable';

const { model, paginate, title, hideCreateButton, hideChangeMode, showTotalCard } = inject('tableProps') as TableProps
const { isRefetching, isPending, isError, globalFilter, data, refetch, dataMode, } = inject("tableInfo") as TableMetadata

const { t } = useI18n(model.getLocales());

const dataLenght = computed(() => {
  let dataLenght = 0
  if (data.value) {
    dataLenght = "elements_amount" in data.value ? data.value.elements_amount : data.value.data?.length
  }
  return dataLenght
})

const searchQuery = ref('');

let timeout: NodeJS.Timeout;

watch(searchQuery, (newValue) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    globalFilter.value = newValue;
  }, 300);
});

// const menu = ref();

// const exportOptions = ref([
//   {
//     label: t('global.options'),
//     items: [
//       {
//         label: 'CSV',
//         icon: 'pi pi-file-excel',
//         command: () => dt.value.exportCSV()
//       }
//     ]
//   }
// ]);
// const toggle = (value: MouseEvent) => {
//   menu.value.toggle(value);
// };
</script>
