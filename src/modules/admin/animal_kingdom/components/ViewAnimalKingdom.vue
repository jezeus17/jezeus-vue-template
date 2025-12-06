<template>
  <span>{{ t('kingdom.name') }}: {{ kingdom.name }}</span>
</template>
<script setup lang="ts">
import type { ModelRef } from 'vue';
import { useI18n } from 'vue-i18n';
import type { AnimalKingdomModel } from '../models/animal_kingdom.model';
const kingdom = defineModel() as ModelRef<AnimalKingdomModel>
const { t } = useI18n(kingdom.value.getLocales())
</script>
