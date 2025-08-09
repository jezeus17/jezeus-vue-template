<template>
    <Button icon="pi pi-plus" @click="action" />

</template>
<script setup lang="ts">
import { Button } from 'primevue';
import { inject } from 'vue';
import { BaseModel } from '@/common/utils/models/BaseModel';


const model = inject<BaseModel>('model')
const props = defineProps({
    customFunction: {
        type: Function
    }
})
const emit = defineEmits(['show-create-dialog'])


const action = () => {
    if (props.customFunction)
        props.customFunction()
    else emit('show-create-dialog')
    model?.clearData()
}



</script>