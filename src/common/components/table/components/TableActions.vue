<template>
  <div class="custom-table-actions">
    <ViewButton :data-to-show="data" v-if="!hideViewButton &&
      (isLogicErase ? data[model.getFieldAsActive()] == true : true)
      && (column.visibleViewFunction ? column.visibleViewFunction(data) : true)" />

    <UpdateButton :data-to-update="data" v-if="!hideUpdateButton &&
      (isLogicErase ? data[model.getFieldAsActive()] == true : true)
      && (column.visibleUpdateFunction ? column.visibleUpdateFunction(data) : true)" />
    <template v-if="!hideDeleteButton && (column.visibleDeleteFunction ? column.visibleDeleteFunction(data) : true)">

      <DeleteButton :data-to-delete="data" v-if="!isLogicErase" />

      <ActivateButton :data-to-activate="data" v-else-if="data[model.getFieldAsActive()] == false" />
      <DesactivateButton :data-to-desactivate="data" v-else />
    </template>
    <template v-if="extraOptions">
      <template v-for="option in extraOptions" :key="option">
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
import type { BaseModel } from '@/common/utils/models/base/BaseModel';
import { Button } from 'primevue';
import type { TableMetadata } from '../composable/useTable';


defineProps<{ data: BaseModel, column: ColumnProps }>()
const { extraOptions, model, hideUpdateButton, hideDeleteButton, hideViewButton } = inject('tableProps') as TableProps
const { isLogicErase } = inject('tableInfo') as TableMetadata
</script>

<style>
.custom-table-actions {
  display: flex;
  width: 100%;
  align-items: center;
}
</style>
