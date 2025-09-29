<template>
  <Button icon="pi pi-eye" severity="secondary" variant="text" rounded aria-label="Eye"
    v-tooltip="$t('table.view_information')" @click="action()" />
</template>
<script setup lang="ts">
import { inject } from 'vue';
import { Button } from 'primevue';
import type { TableProps } from '../../types/TableProps';


const tableProps = inject('tableProps') as TableProps
const props = defineProps({
  dataToShow: {
    type: Object,
    required: true
  },
  refetch: {
    type: Function,
    required: true
  }
})


const emit = defineEmits(['show-view-dialog'])


const action = async () => {
  tableProps.service.getModel().setData(props.dataToShow)
  emit('show-view-dialog')
  props.refetch()

}



</script>
