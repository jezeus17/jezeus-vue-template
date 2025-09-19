<template>
  <span>{{ t('animal.name') }}: {{ animal.name }}</span>
  <span>{{ t('animal.kingdom') }}: {{ animal.animal_kingdom.name }}</span>
</template>

<script lang="ts" setup>
import type { Animal } from '../../models/animal.model';
import { useI18n } from 'vue-i18n';
import { locales } from '../../locales/locales';

const { t } = useI18n(locales)

defineProps<{ animal: Animal }>()
</script>

<style></style>
