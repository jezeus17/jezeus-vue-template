<template>
  <Button icon="pi pi-trash" severity="danger" variant="text" rounded aria-label="Trash" v-tooltip="$t('global.delete')"
    @click="action($event)" />
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
  dataToDelete: {
    type: Object,
    required: true
  }
})


const action = (event: MouseEvent) => {

  confirm.require({
    target: event.currentTarget,
    header: t('global.delete'),
    message: t('delete_element_ask'),
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: t('global.cancel'),
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: t('global.delete'),
      severity: 'danger',
    },
    accept: async () => {
      tableProps?.service.getModel().setData(props.dataToDelete)
      await mutate()
    },
  });
};

const { mutate } = useMutation({
  mutationKey: [`${queryKey}-delete`],
  mutationFn: () => tableProps.service.delete(),
  onSuccess: async () => {
    await queryClient.refetchQueries({
      queryKey: [queryKey]
    })
    toast.add({ severity: 'info', summary: t('global.operation_succeded'), detail: t('table.element_ok_deleted'), life: 5000 });
    tableProps.service.getModel().clearData()
  },
  onError: async (error) => {
    // if (error instanceof EmailError) {
    //     await refetch()

    //     toast.add({ severity: 'info', summary: t('global.operation_succeded'), detail: t('table.element_ok_deleted'), life: 5000 });

    //     toast.add({ severity: 'error', summary: t('error.operation_failedg'), detail:t(error.message), life: 5000 });

    // } else
    toast.add({ severity: 'error', summary: t('global.operation_failed'), detail: t(error.message), life: 5000 });
  }
})



</script>
<i18n lang="json">{
  "es": {
    "delete_element_ask": "¿Desea eliminar el elemento? Se perderá toda la información correspondiente"
  },
  "en": {
    "delete_element_ask": "Delete this item? All associated data will be permanently lost."
  }
}</i18n>
