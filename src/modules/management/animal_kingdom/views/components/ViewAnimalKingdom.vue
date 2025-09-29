<template>


  <span>{{ t('kingdom.name') }}: {{ kingdom.name }}</span>


</template>
<script setup lang="ts">
import type { ModelRef } from 'vue';
import type { AnimalKingdomModel } from '../../models/animal_kingdom.model';
import { useI18n } from 'vue-i18n';
import { locales } from '../../locales/locales';

const { t } = useI18n(locales)

const kingdom = defineModel() as ModelRef<AnimalKingdomModel>
</script>
