<template>
  <Card class="overflow-auto h-full border border-solid border-[var(--p-menubar-border-color)] !p-0">

    <template #content>

      <DataTable v-if="dataMode == 'table'" :class="internDatatable ? 'intern-datatable' : ''"
        v-model:expandedRows="expandedRows" scrollable v-model:filters="filters as DataTableFilterMeta" :lazy="true"
        @filter="onFilter as unknown as (event: DataTableFilterEvent) => void" @sort="onSortChange" filterDisplay="menu"
        scrollHeight="flex" ref="dt" size="small" :value="tableData" :rows="5">
        <template #header>
          <TableHeader :refetch :data @change-mode="dataMode = 'cards'">
            <template #header>
              <slot name="header"></slot>
            </template>
            <template #statistics-cards>
              <slot name="statistics-cards"></slot>
            </template>
            <template #additional-general-actions>
              <slot name="additional-general-actions"></slot>
            </template>
          </TableHeader>
        </template>
        <Column expander v-if="hasExpander" style="width: 1rem" />
        <template v-for="(col, index) in model.getColumns()" :key="index">

          <Column v-if="!col.isActionsColumn" :filterField="col.field" :field="col.field"
            :header="t(col.header as string)" :filterMatchModeOptions="filterOptions" :sortable="col.sortable">


            <template #body="{ data }: { data: BaseModel }">
              <Skeleton v-if="isRefetching || isPending" width="60%" borderRadius=".4rem" height="1.5rem" />
              <template v-else-if="col.fieldGetter">
                <Rating v-if="col.isRating" :modelValue="data[col.fieldGetter(data) as number] as number" readonly />
                <template v-else-if="col.isBoolean">{{
                  col.fieldGetter(data) == true ? t('global.yes') : t('global.no')
                }}</template>
                <template v-else-if="col.fieldGetter(data) !== undefined">{{
                  col.fieldGetter(data)
                }}</template>
                <template v-else>-</template>
              </template>
              <template v-else>
                <Rating v-if="col.isRating" :modelValue="data[col.field] as number" readonly />
                <template v-else-if="col.isBoolean || col.field === model.getFieldAsActive()">
                  <Tag v-if="data[col.field] == true" severity="success" :value="$t('global.yes')" />
                  <Tag v-else severity="danger" :value="$t('global.no')" />

                </template>
                <template v-else-if="data[col.field] !== undefined">{{
                  data[col.field]
                }}</template>
                <template v-else>-</template>
              </template>

            </template>
            <template v-if="col.filter" #filter="{ filterModel, filterCallback }">
              <slot v-if="col.customFilterTemplate" :name="'custom-filter-template-' + col.customFilterTemplate"
                :filterModel :filterCallback>
              </slot>
              <ServerSelect v-else-if="model.isForeignKey(col.field)" v-model="filterModel.value" :name="col.field"
                :optionLabel="model.getForeignKeyFieldAsLabel(col.field)"
                :model="model.getForeignKeyModel(col.field)" />
              <IconField v-else>
                <InputIcon>
                  <i class="pi pi-search" />
                </InputIcon>
                <InputText v-model="filterModel.value" @keyup.enter="filterCallback()"
                  :placeholder="$t('global.search')" />
              </IconField>


            </template>
            <template #filterclear="{ filterCallback }">
              <Button type="button" icon="pi pi-times" @click="filterCallback()" severity="secondary"></Button>
            </template>
            <template #filterapply="{ filterCallback }">
              <Button type="button" icon="pi pi-check" @click="filterCallback()" severity="success"></Button>
            </template>



          </Column>
          <Column v-else-if="!hideActions" :field="fieldAsID" :header="$t('global.actions')">

            <template #body=slotProps>
              <Skeleton v-if="isRefetching || isPending" width="60%" borderRadius=".4rem" height="1.5rem" />
              <TableActions v-else :data="slotProps.data" :column="col" />

            </template>
          </Column>
        </template>


        <template #empty>

          <LoadingPanel v-if="isRefetching || isPending || isError" centered :error="isError" :refetch="refetch"
            :loading="isRefetching || isPending" />

          <span v-else id="empty-message">{{ $t('global.no-results') }}</span>
        </template>
        <template #expansion="slotProps">
          <slot name="expansion" :slotProps></slot>
        </template>
        <template #footer>
          <Paginator v-if="paginate" v-model:first="offset" :rows="limit" @page="(e) => {
            offset = e.first
            limit = e.rows
            refetch()
          }" :totalRecords="totalRecords" :rowsPerPageOptions="[1, 5, 10, 20, 50]">
            <template #end="slotProps">
              <section class="flex flex-col ml-4">
                <span v-if="data">
                  {{ slotProps.state.first + 1 }} {{ $t('global.to') }} {{ slotProps.state.first + 1 + limit >
                    totalRecords ?
                    totalRecords : slotProps.state.first + 1 + limit }}, {{ $t('global.of') }}
                  {{ totalRecords }}
                </span>
              </section>
            </template>
          </Paginator>
        </template>
      </DataTable>
      <CardsView v-else-if="dataMode == 'cards' && paginate && data" :gridClass>
        <template #header>
          <TableHeader>
            <template #header>
              <slot name="header"></slot>
            </template>
            <template #statistics-cards>
              <slot name="statistics-cards"></slot>
            </template>
            <template #additional-general-actions>
              <slot name="additional-general-actions"></slot>
            </template>
          </TableHeader>
        </template>
        <template #item-template="{ data }">
          <slot name="item-template" :data></slot>
        </template>
      </CardsView>
    </template>
  </Card>
  <InfoDialog />
  <FormDialog />
  <slot name="custom-dialog"></slot>
</template>
<script setup lang="ts" generic="T extends BaseModel">
import Column from 'primevue/column';
import Card from 'primevue/card';
import DataTable, { type DataTableFilterEvent, type DataTableFilterMeta } from 'primevue/datatable';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import { provide } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Rating from 'primevue/rating';
import { useI18n } from 'vue-i18n';
import Skeleton from 'primevue/skeleton';
import Paginator from 'primevue/paginator';
import { Tag } from 'primevue';
import LoadingPanel from '../ui/LoadingPanel.vue';
import CardsView from './components/CardsView.vue';
import TableHeader from './components/TableHeader.vue';
import type { TableProps } from './types/TableProps';
import TableActions from './components/TableActions.vue';
import ServerSelect from '../form/input/ServerSelect.vue';
import { BaseModel } from '@/common/models/base/BaseModel';
import { useTable } from './composable/useTable';
import FormDialog from '../formDialog/FormDialog.vue';
import InfoDialog from '../infoDialog/InfoDialog.vue';

const props = withDefaults(defineProps<TableProps<T>>(), { showTotalCard: true })
const { model, paginate, gridClass } = props
const { t } = useI18n(model.getLocales());

const tableInfo = useTable<T>(props)

const {
  tableData,
  data,
  isPending,
  isRefetching,
  isError,
  refetch,
  limit,
  offset,
  totalRecords,
  filters,
  expandedRows,
  onFilter,
  onSortChange,
  dataMode,
  filterOptions,
  fieldAsID,
} = tableInfo

provide('tableInfo', tableInfo)
provide('tableProps', props)


defineExpose({ ...tableInfo })
</script>
<style>
@import "./styles/table.css"
</style>
