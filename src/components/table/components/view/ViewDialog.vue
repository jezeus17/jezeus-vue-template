<template>
  <Dialog v-model:visible="visible" modal :header="$t('global.information') + ' ' + header"
    class="w-full m-4 max-w-[35rem]">

    <LoadingPanel v-if="isPendingOfOne || isRefetchingOfOne || isErrorOfOne" centered :absolute="false"
      :loading="isPendingOfOne || isRefetchingOfOne" :error="isErrorOfOne" :refetch="refetchOfOne" />

    <div v-else-if="isSuccessOfOne" class="dialog-form">
      <slot name="view-element" :dataOfOne :isPendingOfOne :isErrorOfOne :model="tableProps.model"></slot>
      <div class="flex justify-end gap-2">
        <Button type="button" :label="$t('global.confirm')" @click="visible = false"></Button>
      </div>
    </div>
  </Dialog>
</template>
<script setup lang="ts">
import LoadingPanel from '@/components/ui/LoadingPanel.vue';
import { Button, Dialog } from 'primevue';
import { inject, type ModelRef } from 'vue';
import { useQueryOfOne } from '../../composable/useQueryOfOne';
import type { TableProps } from '../../types/TableProps';



defineProps({
  header: {
    type: String,
    required: true
  }
})

const visible = defineModel() as ModelRef<boolean>
const queryKey = inject('queryKey') as string
const tableProps = inject('tableProps') as TableProps


const { dataOfOne, isErrorOfOne, isPendingOfOne, isRefetchingOfOne, isSuccessOfOne, refetchOfOne } = useQueryOfOne(queryKey, tableProps.model, {})



</script>
