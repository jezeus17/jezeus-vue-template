<template>
  <Card class="overflow-auto h-full border border-solid border-[var(--p-menubar-border-color)] !p-0">

    <template #content>

      <DataTable v-if="dataMode == 'table'" :class="internDatatable ? 'intern-datatable' : ''"
        v-model:expandedRows="expandedRows" scrollable v-model:filters="filters" :lazy="true" @filter="onFilter"
        filterDisplay="menu" scrollHeight="flex" ref="dt" size="small" :value="tableData" :rows="5">


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
        <template v-for="(col, index) in props.model.getColumns()" :key="index">

          <Column v-if="!col.isActionsColumn" :filterField="col.field" :field="col.field"
            :header="t(col.header as string)" :filterMatchModeOptions="filterOptions">


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
                <template v-else-if="col.isBoolean || col.field === props.model.getFieldAsActive()">
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
          limit: limit,
          offset: offset,
          ...props.queryOptions,
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
      <slot name="view-element" :dataOfOne :isPendingOfOne :isErrorOfOne :model :refetch></slot>
    </template>
  </ViewDialog>

  <UpdateDialog :header="dialogsHeader ?? t('header')" v-model="updateDialogVisible">
    <template #form>
      <slot name="form-update"></slot>
    </template>
  </UpdateDialog>


  <slot name="custom-dialog"></slot>


</template>
<script setup lang="ts">
import Column from 'primevue/column';
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import { provide, ref, watch, watchEffect, type Ref } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import Rating from 'primevue/rating';
import { useI18n } from 'vue-i18n';
import Skeleton from 'primevue/skeleton';
import Paginator from 'primevue/paginator';
import { useQueryOfOne } from './composable/useQueryOfOne';
import UpdateDialog from './components/update/UpdateDialog.vue';
import ViewDialog from './components/view/ViewDialog.vue';
import CreateDialog from './components/create/CreateDialog.vue';
import { Tag } from 'primevue';
import LoadingPanel from '../ui/LoadingPanel.vue';
import CardsView from './components/CardsView.vue';
import TableHeader from './components/TableHeader.vue';
import type { TableProps } from './types/TableProps';
import TableActions from './components/TableActions.vue';

useQueryClient()
const props = withDefaults(defineProps<TableProps>(), { showTotalCard: true })
const { t } = useI18n(props.model.getLocales());

const limit = ref(10)
const offset = ref(0)
const totalRecords = ref(0)
const totalPages = ref(0)
const dt = ref();
const tableData = ref()
const dataMode: Ref<'table' | 'cards'> = ref('table')

const filters: Ref<object> = ref({});
const globalFilter = ref('');


props.model.getFilters()?.forEach((f) => {
  filters.value[f.field] = { value: null, matchMode: 'contains', filterMode: f.filterMode, filterField: f.filterField ? f.filterField : f.field }

})

const filtersForServer = ref({});
const filterOptions = ref([
  { label: 'Contains', value: 'contains' }
])

const fieldAsID = props.model.getFieldAsID()
const queryKey = props.model.constructor.name

const expandedRows = ref()

const updateDialogVisible = ref(false)
const viewDialogVisible = ref(false)
const createDialogVisible = ref(false)


const onFilter = (event: { filters: { [s: string]: unknown; } | ArrayLike<unknown>; }) => {
  filtersForServer.value = {}
  Object.entries(event.filters).map((f) => {
    if (f[1].value !== null && f[1].value !== undefined) {
      switch (f[1].filterMode) {
        case 'like':
          filtersForServer.value[f[1].filterField] = `like %${f[1].value}%`
          break;
        case '=':
          filtersForServer.value[f[1].filterField] = f[1].value
          break;
        case 'date':
          {

            const date = new Date(f[1].value);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            const formattedDate = `${year}-${month}-${day}`;
            filtersForServer.value[f[1].filterField] = `like %${formattedDate}%`
            break;
          }
      }

    }

  })
  refetch()
}



const { data, isPending, isSuccess, isRefetching, isError, refetch } = useQuery({
  queryKey: [queryKey],
  queryFn: () => {
    if (props.paginate) {


      return props.customGetAllFunction ?
        props.customGetAllFunction(
          {
            limit: limit.value,
            offset: offset.value,
            ...props.queryOptions,
            where: { ...filtersForServer.value },
            globalFilter: globalFilter.value
          }
        ) :
        props.model.getAllPaginated(
          {
            limit: limit.value,
            offset: offset.value,
            ...props.queryOptions,
            where: { ...filtersForServer.value },
            globalFilter: globalFilter.value
          }
        )
    } else {
      return props.customGetAllFunction ?
        props.customGetAllFunction(
          {
            ...props.queryOptions,
            where: { ...filtersForServer.value },
            globalFilter: globalFilter.value
          }
        ) :
        props.model.getAll(
          {
            ...props.queryOptions,
            where: { ...filtersForServer.value },
            globalFilter: globalFilter.value
          }
        )
    }
  },

})

const { dataOfOne, isPendingOfOne, isErrorOfOne, refetchOfOne } = useQueryOfOne(queryKey, props.model, props.queryOptions, props.customGetOneFunction)

const isLogicErase = props.model.getFieldAsActive() != ''

provide('queryKey', queryKey)
provide('tableProps', props)
provide('isLogicErase', isLogicErase)
provide('refetchOfOne', refetchOfOne)
provide('globalFilter', globalFilter)
provide('limit', limit)
provide('offset', offset)
provide('totalRecords', totalRecords)
provide('totalPages', totalPages)



watch(dataOfOne, (newValue) => {
  if (newValue)
    props.model.setData(newValue)
})
watch(globalFilter, () => refetch())

watchEffect(() => {
  if (isSuccess.value && data.value && !isPending.value && !isRefetching.value) {
    expandedRows.value = null
    totalRecords.value = data.value.elements_amount
    totalPages.value = data.value.pages
    tableData.value = data.value.data
  }
});

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
