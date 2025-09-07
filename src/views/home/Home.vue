<template>

  <section class="w-full flex flex-col items-center ">
    <div class="px-8 mt-20 h-[50vh] gap-0 lg:gap-40 mx-auto flex  items-center flex-col lg:flex-row justify-center">
      <div class="flex flex-col  order-2 lg:order-1 justify-center items-center text-center lg:items-start">
        <h1 class="my-4  text-3xl lg:text-6xl text-primary font-bold leading-tight text-nowrap ">
          {{ t('title') }}
        </h1>
        <p class="leading-normal text-xl lg:text-3xl mb-8 text-gray-500 dark:text-gray-600 ">
          {{ t('subtitle') }}
        </p>
        <div class="flex gap-4">
          <Button v-ripple
            class="mx-auto w-10rem  focus:shadow-outline lg:mx-0 transform transition duration-300 ease hover:scale-105 my-6 py-4 px-8 rounded-full shadow-lg"
            rounded iconPos="right" @click="router.push('/animals')" :label="$t('global.start')"
            icon="pi pi-arrow-right">
          </Button>
          <Button v-ripple as="a" href="https://github.com/jezeus17/jezeus-vue-template" target="_blank" rel="noopener"
            class="mx-auto w-10rem  focus:shadow-outline lg:mx-0 transform transition duration-300 ease hover:scale-105 my-6 py-4 px-8 rounded-full shadow-lg"
            rounded iconPos="right" :label="'Github'" icon="pi pi-github" variant="outlined">
          </Button>
        </div>


      </div>
      <div class=" justify-center w-fit order-1  items-center flex  py-6 text-center">
        <div class="primeicon">
          <img src="/capibara.png" class="w-[5rem] lg:w-[15rem] "></img>
        </div>


      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">

      <HomeCard v-for="card in cards" :description="t(card.description)" :title="card.title" :key="card.title"
        :icon="card.icon" />
    </div>
  </section>
  <footer class="w-full my-10 flex text-xl justify-center items-center text-primary p-8 text-center">
    © {{ new Date().getFullYear() }} Made By jezeus17
  </footer>


</template>
<script setup lang="ts">
import Button from "primevue/button";
import router from "@/router";
// import { userStore } from "@/modules/security/store/user-store";
import { useI18n } from "vue-i18n";
import HomeCard from "./HomeCard.vue";
import { ref } from "vue";

const { t } = useI18n();

const cards = ref([
  {
    id: 1,
    title: "Tanstack Query",
    description: 'tanstack',
    icon: "pi pi-database",
    color: "bg-[#ff4154]"
  },
  {
    id: 2,
    title: "PrimeVue",
    description: 'primevue',
    icon: "pi pi-box",
    color: "bg-[#4f46e5]"
  },
  {
    id: 3,
    title: "Vue I18n",
    description: "i18n",
    icon: "pi pi-language",
    color: "bg-[#38bdf8]"
  },
  {
    id: 4,
    title: "Tailwind CSS",
    description: "tailwind",
    icon: "pi pi-palette",
    color: "bg-[#06b6d4]"
  },
  {
    id: 5,
    title: "Supabase",

    description: "supabase",
    icon: "pi pi-cloud",
    color: "bg-[#3ecf8e]"
  },
  {
    id: 6,
    title: "TypeScript",
    description: "typescript",
    icon: "pi pi-code",
    color: "bg-[#3178c6]"
  }
]);

</script>
<style scoped>
/* .home-background {
  background: -webkit-linear-gradient(10deg, #3faee4, #ffffff, #ffffff, #ffffff, #ffffff);

  background: linear-gradient(10deg, #3faee4, #ffffff, #ffffff, #ffffff, #ffffff);
} */
.primeicon {
  animation: infinite primeIcon linear 6s;
  position: relative;
  z-index: 1;

}

.primeicon::after {
  content: '';
  position: absolute;
  top: -10%;
  left: -10%;
  height: 120%;
  width: 120%;
  background-color: var(--color-primary);
  opacity: 50%;
  border-radius: 100%;
  filter: blur(2rem);
  z-index: -1;
}

@keyframes primeIcon {

  50% {
    transform: translateY(1rem);
  }


}
</style>
<i18n lang="json">{
  "es": {
    "title": "Plantilla Vue",
    "subtitle": "Plantilla CRUD para comenzar tu proyecto ",
    "tanstack": "Data fetching y caching con Tanstack Query para manejo eficiente del estado del servidor.",
    "primevue": "Biblioteca de componentes UI ricos y personalizables para Vue.js.",
    "tailwind": "Framework CSS utility-first para diseñar interfaces rápidamente.",
    "i18n": "Internacionalización para aplicaciones Vue.js con soporte multi-idioma.",
    "supabase": "Backend como servicio con base de datos PostgreSQL.",
    "typescript": "JavaScript tipado para mejorar la calidad y mantenibilidad del código."
  },
  "en": {
    "title": "Vue Template",
    "subtitle": "CRUD template for starting your project",
    "tanstack": "Data fetching and caching with Tanstack Query for efficient server state management.",
    "primevue": "Rich and customizable UI component library for Vue.js.",
    "tailwind": "Utility-first CSS framework for rapidly designing custom interfaces.",
    "i18n": "Internationalization for Vue.js applications with multi-language support.",
    "supabase": "Backend as a service with PostgreSQL database.",
    "typescript": "Typed JavaScript for improved code quality and maintainability."
  }
}</i18n>
