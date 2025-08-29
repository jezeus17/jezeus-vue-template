<template>
    <Button icon="pi pi-history" severity="success" variant="text" rounded aria-label="Recover"
        v-tooltip="$t('global.recover')" @click="action($event)" />
</template>
<script setup lang="ts">
import { inject, type Ref } from 'vue';
import { BaseModel } from '@/common/models/BaseModel';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { Button, useConfirm, useToast } from 'primevue';
import { useI18n } from 'vue-i18n';

const queryClient = useQueryClient()

const queryKey = inject<Ref<string>>('queryKey')
const confirm = useConfirm()
const toast = useToast()
const { t } = useI18n()


const model = inject<BaseModel>('model')
const props = defineProps({
    dataToActivate: {
        type: Object,
        required: true
    }
})



const action = (event: MouseEvent) => {

    confirm.require({
        target: event.currentTarget,
        header: t('table.activate'),

        message: t('activate_element_ask'),
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: t('global.cancel'),
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: t('global.confirm')
        },
        accept: () => {
            let updateObject = { ...props.dataToActivate }
            // for (const key in updateObject) {
            //     if (key.includes('date'))
            //         updateObject[key] = parseDate(updateObject[key]);
            // }

            updateObject[model?.getFieldAsActive()] = 1
            model?.setData(updateObject)

            mutate(updateObject)
        },
    });
};


const { mutate } = useMutation({
    mutationKey: [`${queryKey}-activate`],
    mutationFn: (data: object) => model.update(data),
    onSuccess: async () => {
        await queryClient.refetchQueries({
            queryKey: [queryKey]
        })
        toast.add({ severity: 'info', summary: t('global.operation_succeded'), detail: t('table.element_ok_updated'), life: 5000 });
        model?.clearData()
    },
    onError: (error) => {
        toast.add({ severity: 'error', summary: t('global.operation_failed'), detail: error.statusCode == 404 ? t('table.relations_error') : t(error.message), life: 5000 });
    }
})



</script>
<i18n lang="json">{
    "es": {
        "activate_element_ask": "¿Desea activar el elemento?"
    },
    "en": {
        "activate_element_ask": "Would you like to activate this element?"
    }
}</i18n>