<template>
  <div class="custom-table-actions">
    <ViewButton :data-to-show="data" v-if="!tableProps.hideViewButton &&
      (isLogicErase ? data[tableProps.model.getFieldAsActive()] == true : true)
      && (column.visibleViewFunction ? column.visibleViewFunction(data) : true)" :refetch="refetchOfOne"
      @show-view-dialog="$emit('show-view-dialog')" />

    <UpdateButton :data-to-update="data" v-if="!tableProps.hideUpdateButton &&
      (isLogicErase ? data[tableProps.model.getFieldAsActive()] == true : true)
      && (column.visibleUpdateFunction ? column.visibleUpdateFunction(data) : true)"
      @show-update-dialog="$emit('show-update-dialog')" :custom-function="tableProps.customUpdateFunction" />
    <template
      v-if="!tableProps.hideDeleteButton && (column.visibleDeleteFunction ? column.visibleDeleteFunction(data) : true)">

      <DeleteButton :data-to-delete="data" v-if="!isLogicErase" />

      <ActivateButton :data-to-activate="data" v-else-if="data[tableProps.model.getFieldAsActive()] == false" />
      <DesactivateButton :data-to-desactivate="data" v-else />
    </template>
    <template v-if="tableProps.extraOptions">
      <template v-for="option in tableProps.extraOptions" :key="option">
        <Button v-if="option.renderIf(data)" :severity="option.severity" rounded variant="text"
          :icon="'pi ' + option.icon" v-tooltip="$t(option.tooltip)" @click="option.action(data, $event)" />
      </template>
    </template>


  </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue';
import DeleteButton from './delete/DeleteButton.vue';
import ActivateButton from './logic_delete/ActivateButton.vue';
import DesactivateButton from './logic_delete/DesactivateButton.vue';
import UpdateButton from './update/UpdateButton.vue';
import ViewButton from './view/ViewButton.vue';
import type { TableProps } from '../types/TableProps';
import type ColumnProps from '../types/ColumnProps';
import type { BaseModel } from '@/common/models/BaseModel';
import { Button } from 'primevue';

const tableProps = inject('tableProps') as TableProps
const isLogicErase = inject('isLogicErase') as boolean
const refetchOfOne = inject('refetchOfOne') as () => Promise<unknown>

defineProps<{ data: BaseModel, column: ColumnProps }>()
defineEmits(['show-update-dialog', 'show-view-dialog'])

</script>

<style>
.custom-table-actions {
  display: flex;
  width: 100%;
  align-items: center;
}
</style>
