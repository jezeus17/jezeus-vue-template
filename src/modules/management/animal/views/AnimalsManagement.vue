<template>
  <TableServerPagination ref="table" :service="animalService" paginate :query-options="{
    relations: ['animal_kingdom']
  }" gridClass="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

    <template #view-element>
      <ViewAnimal v-model="animalModel" />
    </template>
    <template #form-add>
      <CreateAnimal v-model="animalModel" />
    </template>
    <template #form-update>
      <UpdateAnimal v-model="animalModel" />
    </template>
    <template #item-template="{ data }">
      <AnimalItemTemplate :animal="data as AnimalModel" />
    </template>
  </TableServerPagination>
</template>
<script setup lang="ts">
import { ref, type Ref } from "vue";
import TableServerPagination from "@/components/table/CustomTable.vue";
import { AnimalModel } from "../models/animal.model";
import CreateAnimal from "./components/CreateAnimal.vue";
import UpdateAnimal from "./components/UpdateAnimal.vue";
import ViewAnimal from "./components/ViewAnimal.vue";
import AnimalItemTemplate from "./components/AnimalItemTemplate.vue";
import { AnimalService } from "../services/animal.service";
const table = ref()
const animalModel: Ref<AnimalModel> = ref(new AnimalModel())
const animalService = ref(new AnimalService(animalModel.value))
</script>
