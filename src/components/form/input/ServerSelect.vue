<template>
  <VSelect v-bind="{ ...$attrs }" :loading="isPending || isRefetching || externLoading" v-model="model" :defaultValue
    :name :label :optionId :options="data?.data" />


</template>

<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query';
import { ref } from 'vue';
import VSelect from './VSelect.vue';
import type { ResponseData } from '@/common/types/ResponseData';
import type { BaseService } from '@/common/models/base/BaseService';
import type { BaseModel } from '@/common/models/base/BaseModel';

type ServerSelectProps = {
  label: string,
  name: string,
  optionId: string,
  externLoading?: boolean,
  multi?: boolean,
  showClear?: boolean,
  service: BaseService<BaseModel>,
}



const props = withDefaults(defineProps<ServerSelectProps>(), { optionId: 'id', showClear: true });
const model = defineModel();

const { data, isPending, isRefetching } =
  useQuery({
    queryKey: [props.service.getModel().url],
    queryFn: async () => {
      const data: ResponseData = await props.service.getAll()
      console.log(data)
      console.log(props.service.getModel())
      if (model.value) {

        defaultValue.value = data.data.find((element) => element[props.service.getModel().getFieldAsID()] == model.value)
      }
      console.log(data)
      return data
    }
  })

const defaultValue = ref()
</script>
