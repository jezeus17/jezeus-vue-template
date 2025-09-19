<template>
  <TableServerPagination ref="table" :model="animal" paginate :query-options="{
    relations: ['animal_kingdom']
  }" gridClass="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">


    <template #view-element>
      <ViewAnimal v-model="animal" />
    </template>
    <template #form-add>
      <CreateAnimal v-model="animal" />
    </template>
    <template #form-update>
      <UpdateAnimal v-model="animal" />
    </template>
    <template #item-template="{ data }">
      <AnimalItemTemplate :animal="data as Animal" />
    </template>




  </TableServerPagination>
</template>
<script setup lang="ts">
import { ref, type Ref } from "vue";
import TableServerPagination from "@/components/table/Table.vue";
import { Animal } from "../models/animal.model";
import CreateAnimal from "./components/CreateAnimal.vue";
import UpdateAnimal from "./components/UpdateAnimal.vue";
import ViewAnimal from "./components/ViewAnimal.vue";
import AnimalItemTemplate from "./components/AnimalItemTemplate.vue";
const table = ref()
const animal: Ref<Animal> = ref(new Animal())

</script>
