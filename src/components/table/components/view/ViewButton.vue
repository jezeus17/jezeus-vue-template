<template>
    <Button icon="pi pi-eye" severity="secondary" variant="text" rounded aria-label="Eye"
        v-tooltip="$t('table.view_information')" @click="action()" />
</template>
<script setup lang="ts">
import { inject } from 'vue';
import { BaseModel } from '@/common/models/BaseModel';
import { Button } from 'primevue';


const model = inject<BaseModel>('model')
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
    model?.setData(props.dataToShow)
    emit('show-view-dialog')
    props.refetch()

}



</script>