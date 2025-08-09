<template>
  <TableServerPagination ref="table" :title="t('title')" :dialogsHeader="t('header')" :model="animal">

    <template #custom-filter-template-sex="{ filterModel, filterCallback }">
      <VRadioButton v-model="filterModel.value" @change="filterCallback" name="sex" :options="['F', 'M']" />

    </template>

    <template #custom-filter-template-enabled="{ filterModel, filterCallback }">
      <div flex w-full gap-4>
        <div flex items-center justify-center gap-2>
          <RadioButton v-model="filterModel.value" @change="filterCallback" inputId="1" :value="0" />
          <label for="1">{{ $t('global.disabled') }}</label>
        </div>
        <div flex items-center justify-center gap-2>
          <RadioButton v-model="filterModel.value" @change="filterCallback" inputId="2" :value="1" />
          <label for="2">{{ $t('global.enabled') }}</label>
        </div>
      </div>

    </template>



    <template #view-element>
      <ViewAnimalKingdom v-model="animal" />
    </template>
    <template #form-add>
      <CreateAnimalKingdom v-model="animal" />
    </template>
    <template #form-update>
      <UpdateAnimalKingdom v-model="animal" />
    </template>

  </TableServerPagination>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import TableServerPagination from "@/components/table/TableServerPagination.vue";
import VRadioButton from "@/components/VRadioButton.vue";
import { RadioButton } from "primevue";
import ViewAnimalKingdom from "./components/ViewAnimalKingdom.vue";
import CreateAnimalKingdom from "./components/CreateAnimalKingdom.vue";
import UpdateAnimalKingdom from "./components/UpdateAnimalKingdom.vue";
import { AnimalKingdom } from "../models/animal_kingdom.model";
const { t } = useI18n();
const table = ref()
const animal = ref(new AnimalKingdom())


</script>
<i18n lang="json">{
  "es": {
    "title": "Reinos Animales",
    "header": "reino animal"
  },
  "en": {
    "title": "Animal Kingdoms",
    "header": "animal kingdom"
  }
}</i18n>