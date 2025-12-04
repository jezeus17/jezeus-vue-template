<template>
  <Button icon="pi pi-pencil" severity="primary" variant="text" rounded aria-label="Pencil"
    v-tooltip="$t('global.update')" @click="action" />
</template>
<script setup lang="ts">
import { inject } from 'vue';
import { Button } from 'primevue';
import type { TableProps } from '../../types/TableProps';
import useFormDialog from '@/components/formDialog/useFormDialog';
import type { TableMetadata } from '../../composable/useTable';

const props = defineProps({
  dataToUpdate: {
    type: Object,
    required: true
  },
})
const { model, customUpdateFunction, updateFormComponent } = inject('tableProps') as TableProps
const { refetchOfOne, refetch } = inject("tableInfo") as TableMetadata


const action = () => {
  model.setData(props.dataToUpdate)
  if (customUpdateFunction)
    customUpdateFunction()
  else useFormDialog().show<object>({
    dialogOptions: {
      title: 'global.update',
      subtitle: 'table.update_element',
      content: updateFormComponent,
    },
    submitOptions: {
      model,
      action: (data) => model.update(data),
    },
    successOptions: {
      action: () => {
        refetch()
        model.clearData()
      },
      message: 'table.element_ok_updated'
    },
    cancelOptions: {
      action: () => {
        model.clearData()
      },
    },
    validationSchema: model.getUpdateSchema(),
  })
  refetchOfOne()

}



</script>
