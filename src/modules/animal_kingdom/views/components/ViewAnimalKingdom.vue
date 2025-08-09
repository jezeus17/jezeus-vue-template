<template>


  <span>{{ t('animal.name') }}: {{ animal.name }}</span>


</template>
<script setup lang="ts">
import type { ModelRef } from 'vue';
import type { Animal } from '../../models/animal_kingdom.model';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const animal = defineModel() as ModelRef<Animal>
</script>

<i18n lang="json">{
  "es": {
    "header": "animal",
    "animal": {
      "name": "Nombre",
      "class": "Clase"
    }
  },
  "en": {
    "header": "animal",
    "animal": {
      "name": "Name",
      "class": "Class"
    }
  }
}</i18n>
