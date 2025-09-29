<template>
  <VInput v-model="kingdom.name" name="name" :label="t('kingdom.name')" validate-async />
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import VInput from "@/components/form/input/VInput.vue";

import { type ModelRef } from "vue";
import { AnimalKingdomModel } from "../../models/animal_kingdom.model";
import { locales } from "../../locales/locales";
const { t } = useI18n(locales)

const kingdom = defineModel() as ModelRef<AnimalKingdomModel>

</script>
