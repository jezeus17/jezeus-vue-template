<template>

  <VInput v-model="animal.name" name="name" :label="t('animal.name')" />
  <ServerSelect v-model="animal.fk_animal_kingdom" name="fk_animal_kingdom" :label="t('animal.kingdom')"
    optionLabel="name" :model="new AnimalKingdomModel()" />

</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import VInput from "@/common/components/form/input/VInput.vue";
import { type ModelRef } from "vue";
import ServerSelect from "@/common/components/form/input/ServerSelect.vue";
import { AnimalKingdomModel } from "@/modules/admin/animal_kingdom/models/animal_kingdom.model";
import type { AnimalModel } from "../models/animal.model";
const animal = defineModel() as ModelRef<AnimalModel>
const { t } = useI18n(animal.value.getLocales())

</script>
