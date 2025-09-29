<template>
  <div class="flex flex-col gap-4 mb-4">
    <h1 class="text-xl !m-0 font-semibold">{{ tableProps.title ?? t('title') }}</h1>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">

      <Card v-if="tableProps.showTotalCard"
        class="border overflow-x-auto overflow-y-hidden border-solid border-[var(--p-menubar-border-color)]">

        <template #content>
          <div class="flex items-center gap-4">
            <i class="pi pi-list text-primary"></i>
            <div>
              <p class="!font-bold text-lg">Total</p>
              <NumberFlow class="text-2xl" :value="data?.elements_amount ?? data?.data.length ?? 0" />
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
        <InputText class="w-12rem lg:w-20rem" v-model="searchQuery" :placeholder="$t('global.search')" />
      </IconField>
      <slot name="header"></slot>
      <div class="flex gap-2">
        <CreateButton v-if="!tableProps.hideCreateButton" :disabled="isPending"
          @show-create-dialog="emit('open-create-dialog')" :customFunction="tableProps.customAddFunction" />

        <Button icon="pi pi-refresh" v-tooltip="$t('global.refresh')" variant="outlined" @click="props.refetch()" />
        <!-- <Button icon="pi pi-download" variant="outlined" @click="toggle" aria-haspopup="true" :disabled="isPending"
          aria-controls="overlay_menu" />
        <Menu ref="menu" id="overlay_menu" :model="exportOptions" :popup="true" /> -->
        <Button icon="pi pi-th-large" v-if="tableProps.paginate" v-tooltip="$t('global.change-mode')" variant="outlined"
          @click="emit('change-mode')" :disabled="isPending" />
        <slot name="additional-general-actions"></slot>



      </div>

    </div>
  </div>

</template>

<script lang="ts" setup>
import { Button, Card, IconField, InputIcon, InputText } from 'primevue';
import NumberFlow from '@number-flow/vue'
import { inject, ref, watch, type Ref } from 'vue';
import type TableHeaderProps from '../types/TableHeaderProps';
import { useI18n } from 'vue-i18n';
import CreateButton from './create/CreateButton.vue';
import type { TableProps } from '../types/TableProps';
const tableProps = inject('tableProps') as TableProps
const props = defineProps<TableHeaderProps>()
const { t } = useI18n(tableProps.service.getModel().getLocales());
const emit = defineEmits(['change-mode', 'open-create-dialog'])
const globalFilter = inject('globalFilter') as Ref<string>

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
