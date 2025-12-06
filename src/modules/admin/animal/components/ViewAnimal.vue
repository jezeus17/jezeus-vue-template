<template>
  <span>{{ t('animal.name') }}: {{ animal.name }}</span>
  <span>{{ t('animal.kingdom') }}: {{ animal.animal_kingdom.name }}</span>
</template>
<script setup lang="ts">
import type { ModelRef } from 'vue';
import type { AnimalModel } from "../models/animal.model";
import { useI18n } from 'vue-i18n';
const animal = defineModel() as ModelRef<AnimalModel>
const { t } = useI18n(animal.value.getLocales())
</script>
