<template>
  <section class="h-full">
    <div class="flex flex-col items-center justify-center w-full h-full">
      <i class="pi pi-times" style="font-size: 4rem;"></i>
      <h1 class="text-4xl mb-0  font-bold">{{ $t('errors.title') }}</h1>
      <h2 class=" text-2xl  mt-4 font-poppins">
        {{ $t('errors.404') }}
      </h2>
      <Button v-ripple class=" mt-6  w-[12rem]" iconPos="left" @click="router.back()" :label="$t('errors.button')"
        icon="pi pi-arrow-left">
      </Button>
    </div>
  </section>
</template>
<script setup lang="ts">
import Button from "primevue/button";
import router from "@/common/router";
</script>
