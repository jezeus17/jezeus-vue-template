<script setup lang="ts">
import VUserCard from "@/components/VUserCard.vue";
import { userStore } from "../../store/user-store";
import { useI18n } from "vue-i18n";
const user = userStore();
const { t } = useI18n()
</script>
<template>

  <h2 class="page-title">{{ t("title") }}</h2>
  <VUserCard m-auto mt-4rem :name="user.name + ' ' + user.last_name" :role="user.role" :id="user.ci"
     :mail="user.email"  />


</template>
<i18n lang="json">{
  "es": {
    "title": "Mi perfil"
  },
  "en":{
    "title": "My Profile"
  }
}</i18n>