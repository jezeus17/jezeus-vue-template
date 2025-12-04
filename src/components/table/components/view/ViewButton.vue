<template>
  <Button icon="pi pi-eye" severity="secondary" variant="text" rounded aria-label="Eye"
    v-tooltip="$t('table.view_information')" @click="action()" />
</template>
<script setup lang="ts">
import { inject } from 'vue';
import { Button } from 'primevue';
import type { TableProps } from '../../types/TableProps';
import useInfoDialog from '@/components/infoDialog/useINfoDialog';
import type { TableMetadata } from '../../composable/useTable';
import { useI18n } from 'vue-i18n';

const { model, detailsComponent, customGetOneFunction, dialogsHeader } = inject('tableProps') as TableProps
const { isErrorOfOne, isPendingOfOne, isRefetchingOfOne, isSuccessOfOne, refetchOfOne } = inject('tableInfo') as TableMetadata

const { t } = useI18n(model.getLocales())

const { dataToShow } = defineProps({
  dataToShow: {
    type: Object,
    required: true
  }
})

const action = async () => {
  model.setData(dataToShow)
  useInfoDialog().show({
    content: detailsComponent,
    model,
    isError: isErrorOfOne,
    isRefetching: isRefetchingOfOne,
    isPending: isPendingOfOne,
    isSuccess: isSuccessOfOne,
    retrieveInfoAction: async () => {
      if (customGetOneFunction)
        await customGetOneFunction(model.getID())
      else await refetchOfOne()
    },
    title: dialogsHeader ?? t('header'),
  })

}

</script>
