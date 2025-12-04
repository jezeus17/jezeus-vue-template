<template>
  <Button icon="pi pi-plus" @click="action" />

</template>
<script setup lang="ts">
import { Button } from 'primevue';
import { inject } from 'vue';
import type { TableProps } from '../../types/TableProps';
import useFormDialog from '@/components/formDialog/useFormDialog';
import type { TableMetadata } from '../../composable/useTable';

const { model, createFormComponent, customAddFunction } = inject('tableProps') as TableProps
const { refetch } = inject("tableInfo") as TableMetadata

const action = () => {
  if (customAddFunction)
    customAddFunction()
  else useFormDialog().show<object>({
    dialogOptions: {
      title: 'global.add',
      subtitle: 'table.new_element',
      content: createFormComponent,
    },
    submitOptions: {
      model,
      action: (data) => model.create(data),
    },
    successOptions: {
      action: () => {
        model.clearData()
        refetch()
      },
      message: 'table.element_ok_added'
    },
    cancelOptions: {
      action: () => {
        model.clearData()
      },
    },
    validationSchema: model.getSchema(),
  })

}

</script>
