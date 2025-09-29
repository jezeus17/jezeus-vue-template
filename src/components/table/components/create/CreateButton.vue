<template>
  <Button icon="pi pi-plus" @click="action" />

</template>
<script setup lang="ts">
import { Button } from 'primevue';
import { inject } from 'vue';
import type { TableProps } from '../../types/TableProps';


const tableProps = inject('tableProps') as TableProps
const props = defineProps({
  customFunction: {
    type: Function
  }
})
const emit = defineEmits(['show-create-dialog'])


const action = () => {
  if (props.customFunction)
    props.customFunction()
  else emit('show-create-dialog')
  tableProps.service.getModel().clearData()
}



</script>
