<template>
  <CustomTable ref="table" paginate :model="kingdom" :details-component="ViewAnimalKingdom"
    :create-form-component="CreateAnimalKingdom" :update-form-component="UpdateAnimalKingdom" hide-change-mode>
  </CustomTable>
</template>
<script setup lang="ts">
import { ref, type ModelRef } from "vue";
import { AnimalKingdomModel } from "../models/animal_kingdom.model";
import CustomTable from "@/common/components/table/CustomTable.vue";
import CreateAnimalKingdom from "../components/CreateAnimalKingdom.vue";
import UpdateAnimalKingdom from "../components/UpdateAnimalKingdom.vue";
import ViewAnimalKingdom from "../components/ViewAnimalKingdom.vue";
const kingdom = ref(new AnimalKingdomModel()) as ModelRef<AnimalKingdomModel>
</script>
