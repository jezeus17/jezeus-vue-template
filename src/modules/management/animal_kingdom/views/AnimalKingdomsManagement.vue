<template>
  <TableServerPagination ref="table" :model="kingdom">



    <template #view-element>
      <ViewAnimalKingdom v-model="kingdom" />
    </template>
    <template #form-add>
      <CreateAnimalKingdom v-model="kingdom" />
    </template>
    <template #form-update>
      <UpdateAnimalKingdom v-model="kingdom" />
    </template>

  </TableServerPagination>
</template>
<script setup lang="ts">
import { ref } from "vue";
import TableServerPagination from "@/components/table/Table.vue";
import ViewAnimalKingdom from "./components/ViewAnimalKingdom.vue";
import CreateAnimalKingdom from "./components/CreateAnimalKingdom.vue";
import UpdateAnimalKingdom from "./components/UpdateAnimalKingdom.vue";
import { AnimalKingdom } from "../models/animal_kingdom.model";
const table = ref()
const kingdom = ref(new AnimalKingdom())


</script>
