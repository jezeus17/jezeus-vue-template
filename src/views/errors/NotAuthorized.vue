<template>
  <section class=" h-full">
    <div class="flex flex-col items-center justify-center w-full h-full">
      <i class="pi pi-lock" style="font-size: 4rem;"></i>
      <h1 text-4xl mb-0 font-bold>{{ $t('errors.title') }}</h1>
      <h2 text-2xl mt-4 font-poppins>
        {{ $t('errors.403') }}
      </h2>
      <Button v-ripple rounded w-12rem iconPos="left" @click="router.back()" :label="$t('errors.button')"
        icon="pi pi-arrow-left">
      </Button>
    </div>
  </section>
</template>
<script setup lang="ts">
import Button from "primevue/button";
import router from "@/router";
</script>
