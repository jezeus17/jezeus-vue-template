<template>
  <Button icon="pi pi-trash" severity="danger" variant="text" rounded aria-label="Trash"
    v-tooltip="$t('global.desactivate')" @click="action($event)" />
</template>
<script setup lang="ts">
import { inject, type Ref } from 'vue';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { Button, useConfirm, useToast } from 'primevue';
import { useI18n } from 'vue-i18n';
import type { TableProps } from '../../types/TableProps';

const queryClient = useQueryClient()

const queryKey = inject<Ref<string>>('queryKey')
const confirm = useConfirm()
const toast = useToast()
const { t } = useI18n()


const tableProps = inject('tableProps') as TableProps
const props = defineProps({
  dataToDesactivate: {
    type: Object,
    required: true
  }
})



const action = (event: MouseEvent) => {


  confirm.require({
    target: event.currentTarget,
    header: t('global.desactivate'),

    message: t('desactivate_element_ask'),
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: t('global.cancel'),
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: t('global.desactivate'),
      severity: 'danger',
    },
    accept: () => {
      const updateObject = { ...props.dataToDesactivate }
      // for (const key in updateObject) {
      //     if (key.includes('date'))
      //         updateObject[key] = parseDate(updateObject[key]);
      // }
      updateObject[tableProps.model.getFieldAsActive()] = 0
      tableProps.model.setData(updateObject)
      mutate(updateObject)
    },
  });
};


const { mutate } = useMutation({
  mutationKey: [`${queryKey}-activate`],
  mutationFn: (data: object) => tableProps.model.update(data),
  onSuccess: async () => {
    await queryClient.refetchQueries({
      queryKey: [queryKey]
    })
    toast.add({ severity: 'info', summary: t('global.operation_succeded'), detail: t('table.element_ok_updated'), life: 5000 });
    tableProps.model.clearData()
  },
  onError: (error) => {
    toast.add({ severity: 'error', summary: t('global.operation_failed'), detail: error.statusCode == 404 ? t('table.relations_error') : t(error.message), life: 5000 });
  }
})



</script>
<i18n lang="json">{
  "es": {
    "desactivate_element_ask": "¿Desea desactivar el elemento?"
  },
  "en": {
    "desactivate_element_ask": "Would you like to desactivate this element?"
  }
}</i18n>
