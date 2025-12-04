<template>
  <div v-if="loading" :class="`${centered ? 'items-center justify-center' : ''} ${absolute ? 'absolute ' : 'relative min-h-20'}  bg-white dark:bg-black z-3 opacity-80 w-full h-full  top-0 left-0 rounded-xl flex
        `">
    <span class="mt-2rem h-fit font-bold text-xl flex items-center justify-center gap-2 text-primary">{{
      $t('global.loading') }}
      <i class="pi pi-spin pi-spinner" style="font-size: 1.5rem"></i> </span>

  </div>
  <div v-else-if="error" :class="`${centered ? 'items-center justify-center' : ''} ${absolute ? 'absolute ' : 'relative min-h-20'} bg-white dark:bg-black z-3 opacity-80 w-full h-full top-0 left-0 rounded-xl flex
        justify-center`">
    <span class="mt-2rem h-fit font-bold text-xl flex flex-col items-center justify-center gap-2
            text-secondary">{{ $t('global.error') }} <Button fluid v-if="refetch" @click="() => refetch()"
        :label="$t('global.retry')" icon="pi pi-refresh"></Button></span>
  </div>

</template>
<script setup lang="ts">
import Button from 'primevue/button';
import type { Ref } from 'vue';

type LoadingPanelProps = {
  loading: boolean | Ref<boolean>,
  error: boolean | Ref<boolean>,
  refetch?: () => Promise<unknown>,
  centered?: boolean,
  absolute?: boolean,
}

const { absolute = true, loading = true, error, centered, refetch } = defineProps<LoadingPanelProps>()
</script>
