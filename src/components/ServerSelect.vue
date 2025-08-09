<template>
    <VSelect v-bind="{ ...$attrs }" :loading="isPending || isRefetching || externLoading" v-model="model" :defaultValue
        :name :label :optionId :options="data" />


</template>

<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query';
import VSelect from './VSelect.vue';
import { BaseModel } from '@/common/utils/models/BaseModel';
import { ref } from 'vue';
const props = defineProps({
    label: { type: String },
    name: { type: String, required: true },
    optionId: { type: String, default: 'id' },
    externLoading: { type: Boolean },
    multi: { type: Boolean },
    showClear: { type: Boolean, default: true },
    queryModel: { type: BaseModel, required: true },

});
const model = defineModel();

const { data, isPending, isRefetching } =
    useQuery({
        queryKey: [props.queryModel.getURL()],
        queryFn: async () => {
            const data: unknown[] = await props.queryModel.getAll()
            if (model.value) {
                defaultValue.value = data.find((element) => element[props.queryModel.getFieldAsID()] == model.value)
            }
            return data
        }
    })

const defaultValue = ref()
</script>
