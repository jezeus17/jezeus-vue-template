<template>
    <Dialog v-model:visible="visible" modal :header="$t('global.information') + ' ' + header"
        class="w-4/5 max-w-50rem min-w-25rem min-h-15rem">

        <LoadingPanel v-if="isPendingOfOne || isRefetchingOfOne || isErrorOfOne" centered relative
            :loading="isPendingOfOne || isRefetchingOfOne" :error="isErrorOfOne" :refetch="refetchOfOne" />

        <div v-else-if="isSuccessOfOne" class="dialog-form">
            <slot name="view-element" :dataOfOne :isPendingOfOne :isErrorOfOne :model></slot>
            <div class="flex justify-end gap-2">
                <Button type="button" :label="$t('global.confirm')" @click="visible = false"></Button>
            </div>
        </div>
    </Dialog>
</template>
<script setup lang="ts">
import { BaseModel } from '@/common/utils/models/BaseModel';
import LoadingPanel from '@/components/LoadingPanel.vue';
import { Button, Dialog } from 'primevue';
import { inject, type ModelRef } from 'vue';
import { useQueryOfOne } from '../../composable/useQueryOfOne';



defineProps({
    header: {
        type: String,
        required: true
    }
})

const visible = defineModel() as ModelRef<boolean>
const queryKey = inject('queryKey') as string
const model = inject('model') as BaseModel


const { dataOfOne, isErrorOfOne, isPendingOfOne, isRefetchingOfOne, isSuccessOfOne, refetchOfOne } = useQueryOfOne(queryKey, model, {})



</script>