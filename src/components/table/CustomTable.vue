<template>
  <Card class="overflow-auto h-full border border-solid border-[var(--p-menubar-border-color)] !p-0">

    <template #content>

      <DataTable v-if="dataMode == 'table'" :class="internDatatable ? 'intern-datatable' : ''"
        v-model:expandedRows="expandedRows" scrollable v-model:filters="filters" :lazy="true" @filter="onFilter"
        @sort="onSortChange" filterDisplay="menu" scrollHeight="flex" ref="dt" size="small" :value="tableData"
        :rows="5">
        <template #header>
          <TableHeader @open-create-dialog="createDialogVisible = true" :is-pending="isPending || isRefetching" :refetch
            :data @change-mode="dataMode = 'cards'">
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


            <template #body="slotProps">
              <Skeleton v-if="isRefetching || isPending" width="60%" borderRadius=".4rem" height="1.5rem" />
              <template v-else-if="col.fieldGetter">
                <Rating v-if="col.isRating" :modelValue="slotProps.data[col.fieldGetter(slotProps.data)]" readonly />
                <template v-else-if="col.isBoolean">{{
                  col.fieldGetter(slotProps.data) == true ? t('global.yes') : t('global.no')
                }}</template>
                <template v-else-if="col.fieldGetter(slotProps.data) !== undefined">{{
                  col.fieldGetter(slotProps.data)
                }}</template>
                <template v-else>-</template>
              </template>
              <template v-else>
                <Rating v-if="col.isRating" :modelValue="slotProps.data[col.field]" readonly />
                <template v-else-if="col.isBoolean || col.field === model.getFieldAsActive()">
                  <Tag v-if="slotProps.data[col.field] == true" severity="success" :value="$t('global.yes')" />
                  <Tag v-else severity="danger" :value="$t('global.no')" />

                </template>
                <template v-else-if="slotProps.data[col.field] !== undefined">{{
                  slotProps.data[col.field]
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
              <TableActions v-else :data="slotProps.data" :column="col" @show-update-dialog="updateDialogVisible = true"
                @show-view-dialog="viewDialogVisible = true" />

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
          <Paginator v-if="paginate" :rows="limit" @page="(e) => {
            offset = e.first
            limit = e.rows
            refetch()
          }" :totalRecords="totalRecords" :rowsPerPageOptions="[1, 10, 20, 30]">
            <template #end="slotProps">
              <section class="flex flex-col ml-4">
                <span v-if="data">
                  {{ slotProps.state.first + 1 }} {{ t('to') }} {{ slotProps.state.first + 1 + limit >
                    totalRecords ?
                    totalRecords : slotProps.state.first + 1 + limit }}, {{ t('of') }}
                  {{ totalRecords }}
                </span>
              </section>
            </template>
          </Paginator>
        </template>
      </DataTable>
      <CardsView v-else-if="dataMode == 'cards' && paginate && data" :model :data="data?.data" :refetch
        :is-pending="isPending || isRefetching" :query-options="{
          limit,
          offset,
          ...queryOptions,
          where: { ...filtersForServer },
        }" :gridClass @show-update-dialog="updateDialogVisible = true" @show-view-dialog="viewDialogVisible = true">
        <template #header>
          <TableHeader @open-create-dialog="createDialogVisible = true" @change-mode="dataMode = 'table'"
            :is-pending="isPending || isRefetching" :refetch :data>
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

  <CreateDialog :header="dialogsHeader ?? t('header')" v-model="createDialogVisible">
    <template #form>
      <slot name="form-add"></slot>
    </template>
  </CreateDialog>

  <ViewDialog :header="dialogsHeader ?? t('header')" v-model="viewDialogVisible">
    <template #view-element>
      <slot name="view-element"></slot>
    </template>
  </ViewDialog>

  <UpdateDialog :header="dialogsHeader ?? t('header')" v-model="updateDialogVisible">
    <template #form>
      <slot name="form-update"></slot>
    </template>
  </UpdateDialog>
  <slot name="custom-dialog"></slot>
</template>
<script setup lang="ts" generic="T extends BaseModel">
import Column from 'primevue/column';
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import { provide, ref, useTemplateRef } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Rating from 'primevue/rating';
import { useI18n } from 'vue-i18n';
import Skeleton from 'primevue/skeleton';
import Paginator from 'primevue/paginator';
import UpdateDialog from './components/update/UpdateDialog.vue';
import ViewDialog from './components/view/ViewDialog.vue';
import CreateDialog from './components/create/CreateDialog.vue';
import { Tag } from 'primevue';
import LoadingPanel from '../ui/LoadingPanel.vue';
import CardsView from './components/CardsView.vue';
import TableHeader from './components/TableHeader.vue';
import type { TableProps } from './types/TableProps';
import TableActions from './components/TableActions.vue';
import ServerSelect from '../form/input/ServerSelect.vue';
import { BaseModel } from '@/common/models/base/BaseModel';
import { useTable } from './composable/useTable';

const props = withDefaults(defineProps<TableProps<T>>(), { showTotalCard: true })
const { model, queryOptions, paginate, gridClass, isFormDataLoading } = props
const { t } = useI18n(model.getLocales());

const dt = useTemplateRef('dt');

const fieldAsID = model.getFieldAsID()

const updateDialogVisible = ref(false)
const viewDialogVisible = ref(false)
const createDialogVisible = ref(false)

const {
  queryKey,
  tableData,
  queryData: data,
  isPending,
  isRefetching,
  isError,
  refetch,
  limit,
  offset,
  totalPages,
  totalRecords,
  filters,
  globalFilter,
  filtersForServer,
  expandedRows,
  onFilter,
  onSortChange,
  dataMode,
  filterOptions
} = useTable<T>(props)

const isLogicErase = props.model.getFieldAsActive() != ''

provide('queryKey', queryKey)
provide('tableProps', props)
provide('isLogicErase', isLogicErase)
provide('globalFilter', globalFilter)
provide('limit', limit)
provide('offset', offset)
provide('totalRecords', totalRecords)
provide('totalPages', totalPages)
provide('isFormDataLoading', isFormDataLoading)


defineExpose({ refetch })

</script>
<style>
.p-card-body,
.p-card-content,
.p-datatable {
  height: 100% !important;
}

.p-datatable-filter-constraint-dropdown {
  display: none !important;
}

.dialog-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.dialog-footer {
  display: flex;
  gap: 1.5rem;
  justify-content: space-between;
}

.loading,
.error {
  display: flex;
  align-items: center;
  justify-content: center;
}

td {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}

.p-datatable-thead {
  z-index: 2 !important;
}

.intern-datatable .p-datatable-thead {
  z-index: 1 !important;
}
</style>
