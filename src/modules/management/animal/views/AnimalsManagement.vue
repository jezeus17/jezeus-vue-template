<template>
  <CustomTable ref="table" :model="animalModel" paginate :query-options="{
    relations: ['animal_kingdom']
  }" gridClass="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" :create-form-component="CreateAnimal"
    :update-form-component="UpdateAnimal" :details-component="ViewAnimal">
    <template #item-template="{ data }">
      <AnimalItemTemplate :animal="data as AnimalModel" />
    </template>
  </CustomTable>
</template>
<script setup lang="ts">
import { ref, type Ref } from "vue";
import CustomTable from "@/components/table/CustomTable.vue";
import { AnimalModel } from "../models/animal.model";
import CreateAnimal from "./components/CreateAnimal.vue";
import UpdateAnimal from "./components/UpdateAnimal.vue";
import ViewAnimal from "./components/ViewAnimal.vue";
import AnimalItemTemplate from "./components/AnimalItemTemplate.vue";
const animalModel = ref(new AnimalModel()) as Ref<AnimalModel>
</script>
