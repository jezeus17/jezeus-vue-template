<template>
  <div class="flex flex-col">
    <span>{{ t('animal.name') }}: {{ animal.name }}</span>
    <span>{{ t('animal.kingdom') }}: {{ animal.animal_kingdom.name }}</span>
  </div>

</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
const { animal, locales } = defineProps<{ animal: unknown, locales: object }>()

const { t } = useI18n(locales)

</script>

<style></style>
