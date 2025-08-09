<template>

  <VInput v-model="animal.name" name="name" :label="t('animal.name')" />

</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import VInput from "@/components/VInput.vue";

import { type ModelRef } from "vue";
import { Animal } from "../../models/animal_kingdom.model";
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