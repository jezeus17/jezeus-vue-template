<template>
  <Select v-model="selectedLocale" :options="availableLocales" class="w-fit" variant="filled" />
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useLocalStorage } from '@vueuse/core';
import Select from 'primevue/select';

const { messages, locale } = useI18n();
const availableLocales = Object.keys(messages.value);


const getBrowserLanguage = () => {
  const lang = navigator.language;
  return lang.substring(0, 2);
};

const storedLocale = useLocalStorage('app-locale', getBrowserLanguage());

const selectedLocale = ref(storedLocale.value);

watch(selectedLocale, (newLocale) => {
  locale.value = newLocale;
  storedLocale.value = newLocale;
});

onMounted(() => {
  if (!availableLocales.some(l => l === storedLocale.value)) {
    storedLocale.value = getBrowserLanguage();
  }

  locale.value = storedLocale.value;
  selectedLocale.value = storedLocale.value;
});
</script>