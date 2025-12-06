<template>
  <VInput v-model="kingdom.name" name="name" :label="t('kingdom.name')" validate-async />
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import VInput from "@/common/components/form/input/VInput.vue";
import { type ModelRef } from "vue";
import type { AnimalKingdomModel } from "../models/animal_kingdom.model";
const kingdom = defineModel() as ModelRef<AnimalKingdomModel>
const { t } = useI18n(kingdom.value.getLocales())

</script>
