<template>
  <TableServerPagination ref="table" :model="animal" paginate :query-options="{
    relations: ['animal_kingdom']
  }">


    <template #view-element>
      <ViewAnimal v-model="animal" />
    </template>
    <template #form-add>
      <CreateAnimal v-model="animal" />
    </template>
    <template #form-update>
      <UpdateAnimal v-model="animal" />
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
const table = ref()
const animal: Ref<Animal> = ref(new Animal())

</script>
