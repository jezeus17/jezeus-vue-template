<template>
  <Table ref="table" paginate :model="kingdom">
    <template #view-element>
      <ViewAnimalKingdom v-model="kingdom" />
    </template>
    <template #form-add>
      <CreateAnimalKingdom v-model="kingdom" />
    </template>
    <template #form-update>
      <UpdateAnimalKingdom v-model="kingdom" />
    </template>

  </Table>
</template>
<script setup lang="ts">
import { ref, type ModelRef } from "vue";
import Table from "@/components/table/CustomTable.vue";
import ViewAnimalKingdom from "./components/ViewAnimalKingdom.vue";
import CreateAnimalKingdom from "./components/CreateAnimalKingdom.vue";
import UpdateAnimalKingdom from "./components/UpdateAnimalKingdom.vue";
import { AnimalKingdomModel } from "../models/animal_kingdom.model";
const kingdom = ref(new AnimalKingdomModel()) as ModelRef<AnimalKingdomModel>

</script>
