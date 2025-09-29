<script setup lang="ts">
import { Card, Paginator } from 'primevue';
import Button from 'primevue/button';

import Skeleton from 'primevue/skeleton';
import { inject } from 'vue';
import { useI18n } from 'vue-i18n';
import type CardsViewProps from '../types/CardsViewProps';
import TableActions from './TableActions.vue';

const { t } = useI18n()

const props = withDefaults(defineProps<CardsViewProps>(), {
  gridClass: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 ',
  paginationOptions: () => [1, 5, 10, 20],
  gridOptions: () => ({
    base: 1,
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
    xxl: 5
  }),
})
const emit = defineEmits(['update-start-index', 'update-pagination-size', 'show-update-dialog', 'show-view-dialog'])


const totalRecords = inject('totalRecords') as number
const offset = inject('offset') as number
const limit = inject('limit') as number


const actionColumn = props.service.getModel().getColumns()?.filter(c => c.isActionsColumn)[0]




</script>
<template>
  <div class="flex flex-col h-full p-2 pt-3">
    <slot name="header"></slot>
    <!-- <div class="flex " v-if="filterOptions">
        <SelectButton v-model="value" :default-value="filterOptions[0] ? filterOptions[0] : null"
          :options="filterOptions" optionLabel="name" @change="onFilterOptions" />
      </div> -->

    <template v-if="!isPending">
      <!--  -->
      <section :class="'grid h-full w-full gap-4  overflow-auto overflow-x-hidden p-2    ' + gridClass">
        <Card v-for="(item, index) in data" :key="index"
          class="border h-fit border-solid border-[var(--p-menubar-border-color)] hover:scale-101 transition-transform">
          <template #content>
            <slot name="item-template" :data="item"></slot>
            <TableActions v-if="actionColumn" :data="item" :column="actionColumn"
              @show-update-dialog="emit('show-update-dialog')" @show-view-dialog="emit('show-view-dialog')" />
          </template>
        </Card>



      </section>

      <span v-if="data.length === 0" class="text-red-500 font-medium cursor-pointer text-base">{{
        t('global.no-results') }}</span>

    </template>
    <span v-else-if="isError" @click="refetch"
      class="text-red-500 overflow-auto  font-medium cursor-pointer text-base">{{
        t('global.error') }}
      <Button @click="refetch" :label="t('global.retry')"></Button>
    </span>

    <div :class="'grid w-full h-full overflow-auto  gap-4 ' + gridClass" v-else>
      <Skeleton v-for="e in [1, 2, 3]" height="8rem" :key="e" class=" w-full animate-pulse   " />
    </div>

    <Paginator class="w-full flex items-center justify-center" :rows="limit" @page="(e) => {
      offset = e.first
      limit = e.rows
      refetch()
    }" :totalRecords="totalRecords" :rowsPerPageOptions="[1, 10, 20, 30]">

      <template #end="slotProps">
        <section class="flex flex-col ml-4">
          <span v-if="data && data.length > 0">
            {{ slotProps.state.first + 1 }} {{ t('to') }} {{ slotProps.state.first + 1 + limit >
              totalRecords ?
              totalRecords : slotProps.state.first + 1 + limit }}, {{ t('of') }}
            {{ totalRecords }}

          </span>


        </section>



      </template>
    </Paginator>


  </div>
</template>
<style>
.p-paginator {
  display: flex !important;
  padding: 0 !important;
}

.p-card-content {
  display: flex;
  flex-direction: column;
}

.p-paginator-content-end {
  margin-left: 0 !important;
}
</style>

<i18n lang="json">{
  "es": {
    "of": "de",
    "to": "al"
  },
  "en": {
    "of": "of",
    "to": "to"
  }
}</i18n>
