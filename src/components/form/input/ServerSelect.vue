<template>
  <VSelect v-bind="{ ...$attrs }" :loading="isPending || isRefetching || externLoading" v-model="modelValue"
    :defaultValue :name :label :optionId :options="data?.data" />


</template>

<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query';
import { ref } from 'vue';
import VSelect from './VSelect.vue';
import type { ResponseData } from '@/common/types/ResponseData';
import type { BaseModel } from '@/common/models/base/BaseModel';

type ServerSelectProps = {
  label?: string,
  name: string,
  optionId?: string,
  externLoading?: boolean,
  multi?: boolean,
  showClear?: boolean,
  model: BaseModel,
}



const props = withDefaults(defineProps<ServerSelectProps>(), { optionId: 'id', showClear: true });
const modelValue = defineModel();

const { data, isPending, isRefetching } =
  useQuery({
    queryKey: [props.model.url],
    queryFn: async () => {
      const data: ResponseData = await props.model.getAll()
      if (modelValue.value) {
        defaultValue.value = data.data.find((element) => element[props.model.getFieldAsID()] == modelValue.value)
      }
      return data
    }
  })

const defaultValue = ref()
</script>
