<template>

    <Dialog v-model:visible="visible" modal :header="$t('global.update') + ' ' + header"
        class="w-4/5 max-w-50rem min-w-25rem">
        <span>{{ $t('table.update_element') }}</span>
        <Form @submit="(values) => mutate(values)" :validation-schema="model?.getUpdateSchema()">
            <div class="dialog-form">
                <slot name="form"></slot>
            </div>
            <div class="dialog-footer">
                <Button type="button" :label="$t('global.cancel')" severity="secondary"
                    @click="visible = false"></Button>

                <Button w-8rem type="submit" :loading="isPending || isFormDataLoading" :label="t('global.save')" />

            </div>
        </Form>
    </Dialog>
</template>
<script setup lang="ts">
import { BaseModel } from '@/common/utils/models/BaseModel';

import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { Button, Dialog, useToast } from 'primevue';
import { Form } from 'vee-validate';
import { inject, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';

const toast = useToast()
const { t } = useI18n()
const queryClient = useQueryClient()


defineProps({
    header: {
        type: String,
        required: true
    }
})
const visible = defineModel()
const queryKey = inject<Ref<string>>('queryKey')
const model = inject<BaseModel>('model')
const isFormDataLoading = inject<Ref<boolean>>('isFormDataLoading')



const { mutate, isPending } = useMutation({
    mutationKey: [`${queryKey}-update`],
    mutationFn: (data: object) => model.update(data),
    onSuccess: async () => {
        await queryClient.refetchQueries({
            queryKey: [queryKey]
        })
        toast.add({ severity: 'info', summary: t('global.operation_succeded'), detail: t('table.element_ok_updated'), life: 5000 });
        visible.value = false
        model?.clearData()
    },
    onError: (error) => {
        toast.add({ severity: 'error', summary: t('global.operation_failed'), detail: error.statusCode == 404 ? t('table.relations_error') : t(error.message), life: 5000 });
    }
})

</script>