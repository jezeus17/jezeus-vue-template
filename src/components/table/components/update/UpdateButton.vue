<template>
  <Button icon="pi pi-pencil" severity="primary" variant="text" rounded aria-label="Pencil"
    v-tooltip="$t('global.update')" @click="action" />
</template>
<script setup lang="ts">
import { inject, type Ref } from 'vue';
import { useQueryClient } from '@tanstack/vue-query';
import { Button } from 'primevue';
import type { TableProps } from '../../types/TableProps';

const queryClient = useQueryClient()

const queryKey = inject<Ref<string>>('queryKey')

const tableProps = inject('tableProps') as TableProps
const props = defineProps({
  dataToUpdate: {
    type: Object,
    required: true
  },
  customFunction: {
    type: Function
  }
})

const emit = defineEmits(['show-update-dialog'])

const action = async () => {
  tableProps.service.getModel().setData(props.dataToUpdate)
  await queryClient.refetchQueries({
    queryKey: [queryKey + '-one']
  })



  if (props.customFunction)
    props.customFunction(tableProps.service.getModel().getID())
  else emit('show-update-dialog')
}



</script>
