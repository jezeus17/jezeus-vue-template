<template>
    <Card overflow-auto h-full>
        <template #content>

            <DataTable v-model:expandedRows="expandedRows" scrollable scrollHeight="flex" removableSort ref="dt"
                size="small" tableStyle="min-width: 50rem"
                :globalFilterFields="props.model.getColumns().map((c) => c.field)" v-model:filters="filters"
                filterDisplay="row" paginator :value="data" :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]">


                <template #header>
                    <div class="custom-table-header">
                        <h1 text-xl m-0 font-semibold>{{ $t(title) }}</h1>
                        <div class="custom-table-header__options">
                            <IconField>
                                <InputIcon>
                                    <i class="pi pi-search" />
                                </InputIcon>
                                <InputText w-12rem lg:w-20rem v-model="filters['global'].value"
                                    :placeholder="$t('global.search')" />
                            </IconField>
                            <slot name="header"></slot>
                            <div flex gap-2>
                                <Button v-if="props.visibleCreateButton" icon="pi pi-plus" @click="showAdd()" />

                                <Button icon="pi pi-download" @click="toggle" aria-haspopup="true"
                                    aria-controls="overlay_menu" severity="secondary" />
                                <Menu ref="menu" id="overlay_menu" :model="exportOptions" :popup="true" />

                                <Button icon="pi pi-refresh" v-tooltip="$t('global.refresh')" severity="secondary"
                                    @click="refetch()" />
                            </div>

                        </div>
                    </div>

                </template>
                <Column expander v-if="hasExpander" style="width: 1rem" />
                <Column v-for="(col, index) in props.model.getColumns()" :key="index" sortable :field="col.field"
                    :header="$t(col.header)">


                    <template #body="slotProps">

                        <Skeleton v-if="isRefetching || isPending" width="60%" borderRadius=".4rem" height="1.5rem" />
                        <div overflow-auto text-sm v-else-if="col.fieldGetter">
                            <Rating v-if="col.isRating" :modelValue="slotProps.data[col.fieldGetter(slotProps.data)]"
                                readonly />
                            <span v-else-if="col.isBoolean">{{
                                col.fieldGetter(slotProps.data) == true ? t('global.yes') : t('global.no') }}</span>
                            <span v-else-if="col.fieldGetter(slotProps.data) !== undefined">{{ typeof
                                col.fieldGetter(slotProps.data) == 'string' ? col.fieldGetter(slotProps.data).length <
                                    20 ? col.fieldGetter(slotProps.data) : col.fieldGetter(slotProps.data).substring(0,
                                        20) + '...' : col.fieldGetter(slotProps.data) }}</span>
                                    <span v-else>-</span>
                        </div>
                        <div overflow-auto text-sm v-else>
                            <Rating v-if="col.isRating" :modelValue="slotProps.data[col.field]" readonly />
                            <template v-else-if="col.isBoolean || col.field === props.model.getFieldAsActive()">
                                <Tag v-if="slotProps.data[col.field] == true" severity="success"
                                    :value="$t('global.yes')" />
                                <Tag v-else severity="danger" :value="$t('global.no')" />

                            </template>

                            <span v-else-if="slotProps.data[col.field] !== undefined">{{ typeof
                                slotProps.data[col.field] == 'string' ? slotProps.data[col.field].length < 20 ?
                                slotProps.data[col.field] : slotProps.data[col.field].substring(0, 20) + '...' :
                                slotProps.data[col.field] }}</span>
                                    <span v-else>-</span>
                        </div>

                    </template>

                </Column>
                <Column v-if="!props.hideActions" :field="fieldAsID" :header="$t('table.actions')">

                    <template #body=slotProps>
                        <Skeleton v-if="isRefetching || isPending" width="60%" borderRadius=".4rem" height="1.5rem" />

                        <div v-else class="custom-table-actions">
                            <div v-for="option in options" :key="option.tooltip">
                                <i v-if="option.renderIf(slotProps.data)" mx-1 :class="option.icon"
                                    v-tooltip="$t(option.tooltip)" @click="option.action(slotProps.data, $event)" />

                            </div>

                        </div>
                    </template>
                </Column>
                <template #empty>
                    <span v-if="isError">{{ $t('errors.title') }}</span>
                    <span v-else id="empty-message">{{ $t('global.no-results') }}</span>
                </template>
                <template #expansion="slotProps">
                    <slot name="expansion" :slotProps></slot>
                </template>
            </DataTable>
        </template>
    </Card>

    <Dialog v-model:visible="showInfoDialog" modal :header="$t('table.information')"
        class="w-4/5 max-w-50rem min-w-25rem min-h-15rem">

        <LoadingPanel v-if="isPendingOfOne || isRefetchingOfOne || isErrorOfOne" centered relative
            :loading="isPendingOfOne || isRefetchingOfOne" :error="isErrorOfOne" :refetch="refetchOfOne" />

        <div v-else-if="isSuccessOfOne" class="dialog-form">
            <slot name="view-element" :dataOfOne :isPendingOfOne :isErrorOfOne :model></slot>
            <div class="flex justify-end gap-2">
                <Button type="button" :label="$t('global.confirm')" @click="showInfoDialog = false"></Button>
            </div>
        </div>
    </Dialog>


    <Dialog v-model:visible="showUpdateDialog" modal :header="$t('global.update')"
        class="w-4/5 max-w-50rem min-w-25rem">
        <span>{{ $t('table.update_element') }}</span>
        <Form @submit="updateElement" :validation-schema="props.model.getUpdateSchema()">
            <div class="dialog-form">
                <slot name="form-update"></slot>
            </div>
            <div class="dialog-footer">
                <Button type="button" :label="$t('global.cancel')" severity="secondary"
                    @click="showUpdateDialog = false"></Button>
                <VButton w-8rem :disabled="isUpdatePending || isFormDataLoading" type="submit">
                    <span v-if="!isUpdatePending || isFormDataLoading">{{ $t("global.save") }} </span>
                    <VLoading v-else />
                </VButton>
            </div>
        </Form>
    </Dialog>
    <Dialog v-model:visible="showUpdateDialog" modal :header="$t('global.update')"
        class="w-4/5 max-w-50rem min-w-25rem">
        <span>{{ $t('table.update_element') }}</span>
        <Form @submit="updateElement" :validation-schema="props.model.getUpdateSchema()">
            <div class="dialog-form">
                <slot name="form-update"></slot>
            </div>
            <div class="dialog-footer">
                <Button type="button" :label="$t('global.cancel')" severity="secondary"
                    @click="showUpdateDialog = false"></Button>
                <VButton w-8rem :disabled="isUpdatePending || isFormDataLoading" type="submit">
                    <span v-if="!isUpdatePending || isFormDataLoading">{{ $t("global.save") }} </span>
                    <VLoading v-else />
                </VButton>
            </div>
        </Form>
    </Dialog>
    <slot name="custom-dialog"></slot>
</template>
<script setup lang="ts">
import Column from 'primevue/column';
import { Form } from 'vee-validate';
import Card from 'primevue/card';
import Dialog from 'primevue/dialog';
import DataTable from 'primevue/datatable';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import { FilterMatchMode } from '@primevue/core/api';
import { ref, watch } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import Rating from 'primevue/rating';
import Menu from 'primevue/menu';
import { useI18n } from 'vue-i18n';
import { BaseModel } from '@/common/utils/models/BaseModel';
import Skeleton from 'primevue/skeleton';
import VButton from '../VButton.vue';
import LoadingPanel from '../LoadingPanel.vue';
import { Tag } from 'primevue';

useQueryClient()
const props = defineProps({
    title: String,
    model: {
        type: BaseModel,
        required: true
    },
    hasExpander: Boolean,
    customAddFunction: Function,
    customUpdateFunction: Function,
    customGetAllFunction: Function,
    customGetOneFunction: Function,
    //validateBefore: Function,
    queryOptions: Object,
    extraOptions: Array,
    isFormDataLoading: Boolean,
    hideActions: Boolean,
    visibleViewButton: Boolean,
    visibleUpdateButton: Boolean,
    visibleCreateButton: {
        type: Boolean,
        default: true
    },
    visibleDeleteButton: {
        type: Boolean,
        default: true
    },

})
const fieldAsID = props.model.getFieldAsID()
const queryKey = props.model.constructor.name
const confirm = useConfirm();
const toast = useToast();
const menu = ref();
const expandedRows = ref()

const toggle = (value: MouseEvent) => {
    menu.value.toggle(value);
};
const { data, isPending, isRefetching, isError, refetch } = useQuery({
    queryKey: [queryKey],
    queryFn: (parameter?) => {
        return props.customGetAllFunction ? props.customGetAllFunction(parameter) : props.model.getAll(props.queryOptions)
    }
})

const { data: dataOfOne, isPending: isPendingOfOne, isSuccess: isSuccessOfOne, isError: isErrorOfOne, isRefetching: isRefetchingOfOne, refetch: refetchOfOne } = useQuery({
    queryKey: [queryKey + '-one'],
    queryFn: () => {
        return props.customGetOneFunction ? props.customGetOneFunction(props.model.getID()) : props.model.getOne(props.queryOptions)
    },
    enabled: false
})

watch(dataOfOne, (newValue) => {
    props.model.setData(newValue)
})
const isLogicErase = props.model.getFieldAsActive() != ''

const options = ref([{
    renderIf: (value) => props.visibleViewButton ? isLogicErase ? value[props.model.getFieldAsActive()] == true : true : false,
    icon: 'pi pi-eye',
    tooltip: 'table.view_information',
    action: (value) => showElement(value)
},
{
    renderIf: (value) => props.visibleUpdateButton ? isLogicErase ? value[props.model.getFieldAsActive()] == true : true : false,
    icon: 'pi pi-file-edit',
    tooltip: 'global.update',
    action: (value) => showUpdate(value)
}
    ,
{
    renderIf: () => !props.hideDelete && props.model.getFieldAsActive() == '',
    icon: 'pi pi-trash',
    tooltip: 'global.delete',
    action: (value, event) => deleteElement(value, event)
},
{
    renderIf: (value) => !props.hideDelete && value[props.model.getFieldAsActive()] == true,
    icon: 'pi pi-trash',
    tooltip: 'global.desactivate',
    action: (value, event) => desactivateElement(value, event)
},
{
    renderIf: (value) => !props.hideDelete && value[props.model.getFieldAsActive()] == false,
    icon: 'pi pi-history',
    tooltip: 'global.recover',
    action: (value, event) => activateElement(value, event)
}
])
if (props.extraOptions)
    options.value.push(...props.extraOptions)

const dt = ref();



const { t } = useI18n();

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

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const selectedRowInfo = ref()

const showInfoDialog = ref(false)

const showAdd = () => {
    if (props.customAddFunction)
        props.customAddFunction()
    else
        showAddDialog.value = true
    props.model.clearData()

}

const showElement = (data: object) => {
    props.model.setData(data)
    showInfoDialog.value = true
    refetchOfOne()
}

const showUpdateDialog = ref(false)

const showUpdate = async (data: object) => {
    props.model.setData(data)
    await refetchOfOne()
    props.model.setData(dataOfOne.value)

    if (props.customUpdateFunction)
        props.customUpdateFunction(props.model.getID())
    else
        showUpdateDialog.value = true

}

const showAddDialog = ref(false)


const addElement = () => {
    mutateAdd()
    //     :validateBefore="(value, values)=>{
    //     const ci = values.filter((u)=>u.ci==value.ci)
    //     if(ci[0] && ci.user_id!=value.ci)
    //       throw new Error('Esta identificación ya existe')
    //   }"
}
const updateElement = (data: object) => {
    mutateUpdate(data)
}




//

const { mutate: mutateAdd, isPending: isAddPending } = useMutation({
    mutationKey: [`${queryKey}-add`],
    mutationFn: () => props.model.create(),
    onSuccess: async () => {
        await refetch()
        toast.add({ severity: 'info', summary: t('global.operation_succeded'), detail: t('table.element_ok_added'), life: 5000 });
        showAddDialog.value = false
        props.model.clearData()
    },
    onError: (error) => {
        toast.add({ severity: 'error', summary: t('global.operation_failed'), detail: t(error.message), life: 5000 });
    }
})


const { mutate: mutateUpdate, isPending: isUpdatePending } = useMutation({
    mutationKey: [`${queryKey}-update`],
    mutationFn: (data: object) => props.model.update(data),
    onSuccess: async () => {
        await refetch()
        toast.add({ severity: 'info', summary: t('global.operation_succeded'), detail: t('table.element_ok_updated'), life: 5000 });
        showUpdateDialog.value = false
        props.model.clearData()
    },
    onError: (error) => {
        toast.add({ severity: 'error', summary: t('global.operation_failed'), detail: error.statusCode == 404 ? t('table.relations_error') : t(error.message), life: 5000 });
    }
})




const { mutate: mutateDelete } = useMutation({
    mutationKey: [`${queryKey}-delete`],
    mutationFn: () => props.model.delete(),
    onSuccess: async () => {
        await refetch()
        toast.add({ severity: 'info', summary: t('global.operation_succeded'), detail: t('table.element_ok_deleted'), life: 5000 });
        props.model.clearData()
    },
    onError: async (error) => {
        // if (error instanceof EmailError) {
        //     await refetch()

        //     toast.add({ severity: 'info', summary: t('global.operation_succeded'), detail: t('table.element_ok_deleted'), life: 5000 });

        //     toast.add({ severity: 'error', summary: t('global.operation_failed'), detail:t(error.message), life: 5000 });

        // } else
        toast.add({ severity: 'error', summary: t('global.operation_failed'), detail: t(error.message), life: 5000 });
    }
})

defineExpose({ showUpdate, refetch, desactivateElement, activateElement })

</script>
<style>
.p-card-body,
.p-card-content,
.p-datatable {
    height: 100% !important;
}

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
</style>