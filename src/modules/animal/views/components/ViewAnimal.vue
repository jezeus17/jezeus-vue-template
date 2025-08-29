<template>


  <span>{{ t('animal.name') }}: {{ animal.name }}</span>


</template>
<script setup lang="ts">
import type { ModelRef } from 'vue';
import type { Animal } from '../../models/animal.model';
import { useI18n } from 'vue-i18n';
import { locales } from '../../locales/locales';

const { t } = useI18n(locales)

const animal = defineModel() as ModelRef<Animal>
</script>
