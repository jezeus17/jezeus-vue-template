<template>

  <section class="pt-24 anim-opacity-0.5">
    <div class=" gap-8 px-8 mx-auto flex w-90vw items-center flex-col lg:flex-row justify-center">
      <div class="flex flex-col h-[60vh] w-full max-w-40rem justify-center items-center text-center lg:text-left">
        <h1 class="my-4 text-3xl w-4/5 font-bold leading-tight text-nowrap">
          {{ t('title') }}
        </h1>
        <p class="leading-normal w-4/5 text-2xl mb-8">
          {{ t('subtitle') }}
        </p>
        <div class="w-4/5 ">

          <Button v-ripple
            class="mx-auto w-10rem  focus:shadow-outline lg:mx-0 transform transition duration-300 ease hover:scale-105 my-6 py-4 px-8 rounded-full shadow-lg"
            rounded iconPos="right" @click="router.push('/users')" :label="$t('global.start')" icon="pi pi-arrow-right">
          </Button>
        </div>

      </div>
      <div class=" justify-center w-fit  items-center flex  py-6 text-center">
        <img class=" max-h-28rem z-10" src="/capibara.png" />


      </div>
    </div>
  </section>


</template>
<script setup lang="ts">
import Button from "primevue/button";
import router from "@/router";
// import { userStore } from "@/modules/security/store/user-store";
import { useI18n } from "vue-i18n";

const { t } = useI18n();



</script>
<style>
/* .home-background {
  background: -webkit-linear-gradient(10deg, #3faee4, #ffffff, #ffffff, #ffffff, #ffffff);

  background: linear-gradient(10deg, #3faee4, #ffffff, #ffffff, #ffffff, #ffffff);
} */
</style>
<i18n lang="json">{
  "es": {
    "title": "Plantilla Primevue",
    "subtitle": "Plantilla CRUD para comenzar tu proyecto "
  },
  "en": {
    "subtitle": "Your digital platform to administer, create, and analyze psychological tests",
    "overtitle": "Psychological assessment software",
    "title": "Meet TestSoft"
  }
}</i18n>
