<template>
  <Card overflow-auto h-full>
    <template #content>
      <TreeTable v-model:expandedKeys="expandedKeys" sortMode="multiple" removableSort ref="dt" scrollable
        scrollHeight="flex" size="small" tableStyle="min-width: 50rem" :value="tableData" :rows="5" :filters="filters"
        :filterMode="filterMode.value">


        <template #header>
          <div class="custom-table-header">
            <h1 text-xl m-0 font-semibold>{{ props.title ? props.title : '' }}</h1>
            <div class="custom-table-header__options">
              <IconField>
                <InputIcon>
                  <i class="pi pi-search" />
                </InputIcon>
                <InputText w-12rem lg:w-20rem v-model="filters['global']" :placeholder="$t('global.search')" />
              </IconField>
              <slot name="header"></slot>
              <div flex gap-2>
                <CreateButton v-if="!props.hideCreateButton" @show-create-dialog="createDialogVisible = true"
                  :customFunction="props.customAddFunction" />


                <!-- <Button icon="pi pi-download" variant="outlined" @click="toggle" aria-haspopup="true"
                                    aria-controls="overlay_menu" severity="info" /> -->
                <Menu ref="menu" id="overlay_menu" :model="exportOptions" :popup="true" />

                <Button icon="pi pi-refresh" v-tooltip="$t('global.refresh')" variant="outlined" severity="info"
                  @click="refetch()" />
              </div>

            </div>
          </div>

        </template>


        <div v-for="(col, index) in props.model.getColumns()" :key="index">
          <Column expander v-if="col.expander" :field="fiedAsExpander.field" :header="t(fiedAsExpander.header)">

            <template #body=slotProps>

              <Skeleton v-if="isRefetching || isPending" width="60%" borderRadius=".4rem" height="1.5rem" />
              <template v-else>
                <template v-if="slotProps.node[fiedAsExpander.field] !== undefined">{{
                  slotProps.node[fiedAsExpander.field] }}</template>
                <template v-else>-</template>
              </template>
            </template>

          </Column>
          <Column v-else-if="!col.isActionsColumn" :filterField="col.field" sortable :field="col.field"
            :header="$t(col.header)">


            <template #body="slotProps">
              <Skeleton v-if="isRefetching || isPending" width="60%" borderRadius=".4rem" height="1.5rem" />
              <template v-else-if="col.fieldGetter">
                <Rating v-if="col.isRating" :modelValue="slotProps.data[col.fieldGetter(slotProps.data)]" readonly />
                <template v-else-if="col.isBoolean">{{
                  col.fieldGetter(slotProps.data) == true ? t('global.yes') : t('global.no')
                  }}</template>
                <template v-else-if="col.fieldGetter(slotProps.data) !== undefined">
                  {{ col.fieldGetter(slotProps.data) }}</template>
                <template v-else>-</template>
              </template>
              <template v-else>
                <Rating v-if="col.isRating" :modelValue="slotProps.data[col.field]" readonly />
                <template v-else-if="col.isBoolean || col.field === props.model.getFieldAsActive()">
                  <Tag v-if="slotProps.data[col.field] == true" severity="success" :value="$t('global.yes')" />
                  <Tag v-else severity="danger" :value="$t('global.no')" />

                </template>
                <template v-else-if="slotProps.data[col.field] !== undefined">{{
                  slotProps.data[col.field] }}</template>
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
                <InputText v-model="filterModel.value" @keyup.enter="filterCallback()" placeholder="Buscar" />
              </IconField>

            </template>



          </Column>
          <Column v-else-if="visibleActions" :field="fieldAsID" :header="$t('global.actions')">

            <template #body=slotProps>
              <Skeleton v-if="isRefetching || isPending" width="60%" borderRadius=".4rem" height="1.5rem" />

              <div v-else class="custom-table-actions">
                <ViewButton :data-to-show="slotProps.node" v-if="props.visibleViewButton &&
                  (isLogicErase ? slotProps.node[props.model.getFieldAsActive()] == true : true)
                  && (col.visibleViewFunction ? col.visibleViewFunction(slotProps.node) : true)"
                  :refetch="refetchOfOne" @show-view-dialog="viewDialogVisible = true" />

                <UpdateButton :data-to-update="slotProps.node" v-if="props.visibleUpdateButton &&
                  (isLogicErase ? slotProps.node[props.model.getFieldAsActive()] == true : true)
                  && (col.visibleUpdateFunction ? col.visibleUpdateFunction(slotProps.node) : true)"
                  @show-update-dialog="updateDialogVisible = true" :custom-function="customUpdateFunction" />
                <template
                  v-if="props.visibleDeleteButton && (col.visibleDeleteFunction ? col.visibleDeleteFunction(slotProps.node) : true)">

                  <DeleteButton :data-to-delete="slotProps.node" v-if="!isLogicErase" />

                  <ActivateButton :data-to-activate="slotProps.node"
                    v-else-if="slotProps.node[props.model.getFieldAsActive()] == false" />
                  <DesactivateButton :data-to-desactivate="slotProps.node" v-else />
                </template>
                <template v-if="props.extraOptions">
                  <template v-for="option in props.extraOptions" :key="option">
                    <i v-if="option.renderIf(slotProps.node)" mx-1 :class="option.icon" v-tooltip="$t(option.tooltip)"
                      @click="option.action(slotProps.node, $event)" />
                  </template>
                </template>


              </div>
            </template>
          </Column>
        </div>


        <template #empty>
          <LoadingPanel v-if="isRefetching || isPending" centered :error="isError" :refetch="refetch"
            :loading="isRefetching || isPending" />
          <span v-else-if="isError">{{ $t('errors.title') }}</span>
          <span v-else id="empty-message">{{ $t('global.no-results') }}</span>
        </template>

      </TreeTable>
    </template>
  </Card>

  <CreateDialog :header="dialogsHeader" v-model="createDialogVisible">
    <template #form>
      <slot name="form-add"></slot>
    </template>
  </CreateDialog>

  <ViewDialog :header="dialogsHeader" v-model="viewDialogVisible">
    <template #view-element>
      <slot name="view-element" :dataOfOne :isPendingOfOne :isErrorOfOne :model></slot>
    </template>
  </ViewDialog>

  <UpdateDialog :header="dialogsHeader" v-model="updateDialogVisible">
    <template #form>
      <slot name="form-update"></slot>
    </template>
  </UpdateDialog>


  <slot name="custom-dialog"></slot>
</template>
<script setup lang="ts">
import Column from 'primevue/column';
import Card from 'primevue/card';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import { provide, ref, watch, watchEffect } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import Rating from 'primevue/rating';
import Menu from 'primevue/menu';
import { useI18n } from 'vue-i18n';
import { BaseModel } from '@/common/models/BaseModel';
import Skeleton from 'primevue/skeleton';
import CreateButton from './components/create/CreateButton.vue';
import UpdateButton from './components/update/UpdateButton.vue';
import { useQueryOfOne } from './composable/useQueryOfOne';
import ViewButton from './components/view/ViewButton.vue';
import UpdateDialog from './components/update/UpdateDialog.vue';
import ViewDialog from './components/view/ViewDialog.vue';
import CreateDialog from './components/create/CreateDialog.vue';
import DeleteButton from './components/delete/DeleteButton.vue';
import ActivateButton from './components/logic_delete/ActivateButton.vue';
import DesactivateButton from './components/logic_delete/DesactivateButton.vue';
import { Tag, TreeTable } from 'primevue';
import LoadingPanel from '../ui/LoadingPanel.vue';

useQueryClient()
const { t } = useI18n();

const props = defineProps({
  title: String,
  model: {
    type: BaseModel,
    required: true
  },
  dialogsHeader: {
    type: String,
    default: ''
  },
  hasExpander: Boolean,
  customAddFunction: Function,
  customUpdateFunction: Function,
  customGetAllFunction: Function,
  customGetOneFunction: Function,
  //validateBefore: Function,
  queryOptions: Object,
  extraOptions: Array<{ renderIf: (data: object) => boolean, tooltip: string, icon: string, action: (data: BaseModel, event: MouseEvent) => void }>,
  isFormDataLoading: Boolean,
  visibleActions: {
    type: Boolean,
    default: true
  },
  visibleViewButton: {
    type: Boolean,
    default: true
  },
  visibleUpdateButton: {
    type: Boolean,
    default: true
  },
  hideCreateButton: {
    type: Boolean,
    default: false
  },
  visibleDeleteButton: {
    type: Boolean,
    default: true
  },

})

const limit = ref(10)
const offset = ref(0)
const totalRecords = ref(0)
const totalPages = ref(0)
const dt = ref();
const tableData = ref()
const expandedKeys = ref({});



const filters = ref({});
const filterMode = ref({ label: 'Lenient', value: 'lenient' });


// props.model.getFilters()?.forEach((f) => {
//     filters.value[f.field] = { value: null, matchMode: 'contains' }

// })

// const filtersForServer = ref({});
// const filterOptions = ref([
//     { label: 'Contains', value: 'contains' }
// ])

const fieldAsID = props.model.getFieldAsID()
const queryKey = props.model.constructor.name

const menu = ref();

const updateDialogVisible = ref(false)
const viewDialogVisible = ref(false)
const createDialogVisible = ref(false)
const fiedAsExpander = props.model.getColumns().filter(c => c.expander)[0]


provide('queryKey', queryKey)
provide('model', props.model)
provide('isFormDataLoading', props.isFormDataLoading)


// const onFilter = (event) => {
//     filtersForServer.value = {}
//     Object.entries(event.filters).map((f) => {
//         if (f[1].value)
//             filtersForServer.value[f[0]] = f[1].value
//     })
//     refetch()
// }



// const toggle = (value: MouseEvent) => {
//     menu.value.toggle(value);
// };
const { data, isPending, isSuccess, isRefetching, isError, refetch } = useQuery({
  queryKey: [queryKey],
  queryFn: (parameter?) => {
    return props.model.getElementsForTreeTable(
      {
        limit: limit.value,
        offset: offset.value,
        //where: filtersForServer.value,
        ...props.queryOptions
      }
    )
  },

})

const { dataOfOne, isPendingOfOne, isErrorOfOne, refetchOfOne } = useQueryOfOne(queryKey, props.model, props.queryOptions)


const isLogicErase = props.model.getFieldAsActive() != ''


const exportOptions = ref([
  {
    label: t('global.options'),
    items: [
      {
        label: 'CSV',
        icon: 'pi pi-file-excel',
        command: () => dt.value.exportCSV()
      }
    ]
  }
]);




// const parseData = (data) => {
//     for (const key in data) {
//         if (Object.prototype.hasOwnProperty.call(props.model, key)) {
//             // if (key.includes('date'))
//             //     props.queryOptions.model.value[key] = parseDate(data[key]);
//             // else
//             props.model.value[key] = data[key];
//         }
//     }
// }

// if (props.queryOptions.requestPDF) {
//     exportOptions.value[0].items.push(
//         {
//             label: 'PDF',
//             icon: 'pi pi-file-pdf',
//             command: async () => await props.queryOptions.requestPDF()
//         })
// }


watch(dataOfOne, (newValue) => {
  console.log(newValue)
  props.model.setData(newValue)
})

watchEffect(() => {
  if (isSuccess.value && !isPending.value && !isRefetching.value) {
    expandedKeys.value = {}
    totalRecords.value = data.value.elements_amount
    totalPages.value = data.value.pages
    tableData.value = data.value.data
  }
});

defineExpose({ refetch })




</script>
<style>
.custom-table-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;

}

.custom-table-header__options {
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 1rem;
}

.custom-table-actions {
  display: flex;
  width: 100%;
  align-items: center;
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
</style>
