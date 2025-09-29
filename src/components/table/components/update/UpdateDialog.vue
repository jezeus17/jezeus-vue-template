<template>

  <Dialog v-model:visible="visible" modal :header="$t('global.update') + ' ' + header" class="w-full m-4 max-w-[35rem]">
    <span>{{ $t('table.update_element') }}</span>
    <Form @submit="(values) => mutate(values)" :validation-schema="tableProps.service.getUpdateSchema()">
      <div class="dialog-form">
        <slot name="form"></slot>
      </div>
      <div class="dialog-footer">
        <Button type="button" :label="$t('global.cancel')" severity="secondary" @click="visible = false"></Button>

        <Button w-8rem type="submit" :loading="isPending || isFormDataLoading" :label="t('global.save')" />

      </div>
    </Form>
  </Dialog>
</template>
<script setup lang="ts">

import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { Button, Dialog, useToast } from 'primevue';
import { Form } from 'vee-validate';
import { inject, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type { TableProps } from '../../types/TableProps';

const toast = useToast()
const { t } = useI18n()
const queryClient = useQueryClient()


defineProps({
  header: {
    type: String,
    required: true
  }
})
const visible = defineModel() as Ref<boolean>
const queryKey = inject<Ref<string>>('queryKey')
const tableProps = inject('tableProps') as TableProps
const isFormDataLoading = inject<Ref<boolean>>('isFormDataLoading')



const { mutate, isPending } = useMutation({
  mutationKey: [`${queryKey}-update`],
  mutationFn: (data: object) => tableProps.service.update(data),
  onSuccess: async () => {
    await queryClient.refetchQueries({
      queryKey: [queryKey]
    })
    toast.add({ severity: 'info', summary: t('global.operation_succeded'), detail: t('table.element_ok_updated'), life: 5000 });
    visible.value = false
    tableProps.service.getModel().clearData()
  },
  onError: (error) => {
    toast.add({ severity: 'error', summary: t('global.operation_failed'), detail: error.message, life: 5000 });
  }
})

</script>
