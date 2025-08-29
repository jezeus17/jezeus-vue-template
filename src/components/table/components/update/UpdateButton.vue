<template>
    <Button icon="pi pi-pencil" severity="primary" variant="text" rounded aria-label="Pencil"
        v-tooltip="$t('global.update')" @click="action($event)" />
</template>
<script setup lang="ts">
import { inject, type Ref } from 'vue';
import { BaseModel } from '@/common/models/BaseModel';
import { useQueryClient } from '@tanstack/vue-query';
import { Button } from 'primevue';

const queryClient = useQueryClient()

const queryKey = inject<Ref<string>>('queryKey')

const model = inject<BaseModel>('model')
const props = defineProps({
    dataToUpdate: {
        type: Object,
        required: true
    },
    customFunction: {
        type: Function
    }
})

const emit = defineEmits(['show-update-dialog'])

const action = async (event) => {
    model?.setData(props.dataToUpdate)
    await queryClient.refetchQueries({
        queryKey: [queryKey + '-one']
    })



    if (props.customFunction)
        props.customFunction(model?.getID())
    else emit('show-update-dialog')
}



</script>