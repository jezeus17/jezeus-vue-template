<template>
  <Button icon="pi pi-history" severity="success" variant="text" rounded aria-label="Recover"
    v-tooltip="$t('global.recover')" @click="action($event)" />
</template>
<script setup lang="ts">
import { inject } from 'vue';
import { useMutation } from '@tanstack/vue-query';
import { Button, useConfirm, useToast } from 'primevue';
import { useI18n } from 'vue-i18n';
import type { TableProps } from '../../types/TableProps';
import type { TableMetadata } from '../../composable/useTable';


const { queryKey, refetch } = inject('tableInfo') as TableMetadata
const confirm = useConfirm()
const toast = useToast()
const { t } = useI18n()


const tableProps = inject('tableProps') as TableProps
const props = defineProps({
  dataToActivate: {
    type: Object,
    required: true
  }
})



const action = (event: MouseEvent) => {

  confirm.require({
    target: event.currentTarget as HTMLElement,
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
      const updateObject = { ...props.dataToActivate }
      // for (const key in updateObject) {
      //     if (key.includes('date'))
      //         updateObject[key] = parseDate(updateObject[key]);
      // }

      updateObject[tableProps.model.getFieldAsActive()] = 1
      tableProps.model.setData(updateObject)
      mutate(updateObject)
    },
  });
};


const { mutate } = useMutation({
  mutationKey: [`${queryKey}-activate`],
  mutationFn: (data: object) => tableProps.model.update(data),
  onSuccess: () => {
    tableProps.model.clearData()
    toast.add({ severity: 'success', summary: t('global.operation_succeded'), detail: t('table.element_ok_updated'), life: 5000 });
    refetch()
  },
  onError: (error) => {
    toast.add({ severity: 'error', summary: t('global.operation_failed'), detail: t(error.message), life: 5000 });
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
