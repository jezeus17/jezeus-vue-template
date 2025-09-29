<template>

  <VInput v-model="animal.name" name="name" :label="t('animal.name')" />
  <ServerSelect v-model="animal.fk_animal_kingdom" name="fk_animal_kingdom" :label="t('animal.kingdom')"
    optionLabel="name" :service="new AnimalKingdomService(animal)" />



</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import VInput from "@/components/form/input/VInput.vue";

import { type ModelRef } from "vue";
import { AnimalModel } from "../../models/animal.model";
import { AnimalKingdomModel } from "@/modules/management/animal_kingdom/models/animal_kingdom.model";
import ServerSelect from "@/components/form/input/ServerSelect.vue";
import { locales } from "../../locales/locales";
import { AnimalKingdomService } from "@/modules/management/animal_kingdom/services/animal_kingdom.service";
const { t } = useI18n(locales)

const animal = defineModel() as ModelRef<AnimalModel>


</script>
