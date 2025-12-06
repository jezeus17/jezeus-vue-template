<template>
  <Card class="p-4 home_card !bg-gray-50 dark:!bg-zinc-900 max-w-[30rem]">
    <template #header>
      <p class="text-primary text-xl !font-bold "><i :class="`pi ${icon} mr-2`"></i>{{ title }} </p>
    </template>
    <template #content>
      <p class="text-lg">
        {{ description }}
      </p>

    </template>
  </Card>
</template>

<script lang="ts" setup>
import { Card } from 'primevue';
interface Props {
  title: string
  description: string
  icon: string
}

defineProps<Props>()

</script>

<style>
.home_card .p-card-body {
  margin-top: 1rem;
  padding: 0 !important;
}
</style>
