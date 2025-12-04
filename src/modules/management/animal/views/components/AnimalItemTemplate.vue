<template>
  <span>{{ t('animal.name') }}: {{ animal.name }}</span>
  <span>{{ t('animal.kingdom') }}: {{ animal.animal_kingdom.name }}</span>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { locales } from '../../locales/locales';
import type { AnimalModel } from '../../models/animal.model';

const { t } = useI18n(locales)

defineProps<{ animal: AnimalModel }>()
</script>

<style></style>
