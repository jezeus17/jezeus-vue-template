<template>
  <div>
    <Button :icon="darkMode ? 'pi pi-sun' : 'pi pi-moon'" class="w-8" severity="secondary" @click="toggleDarkMode()"
      v-tooltip.left="t(darkMode ? 'light' : 'dark')" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Button } from 'primevue';
import { useI18n } from 'vue-i18n';
import { checkSystemPreference, updateDarkClass } from '@/common/utils/darkModeUtils';
import useEvents from '@/common/composables/useEvents';

const darkMode = ref<boolean>(false);
const { t } = useI18n()

onMounted(() => {
  const savedMode = localStorage.getItem('darkMode');
  darkMode.value = savedMode !== null ? JSON.parse(savedMode) : checkSystemPreference()
  updateDarkClass(darkMode.value);
});

function toggleDarkMode() {
  darkMode.value = !darkMode.value;
  localStorage.setItem('darkMode', JSON.stringify(darkMode.value));
  updateDarkClass(darkMode.value);
  useEvents().dispatch('darkmode-change')
}





</script>

<i18n lang="json">{
  "es": {
    "dark": "Modo oscuro",
    "light": "Modo claro"
  },
  "en": {
    "dark": "Dark mode",
    "light": "Light mode"
  }
}</i18n>