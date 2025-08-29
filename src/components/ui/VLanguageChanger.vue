<template>
  <div
    ml-1rem
    mt-0.5rem
    trans-0.2
    z-5
    hover:scale-110
    active:opacity-50
    active:scale-100
    cursor-pointer
    pointer-events-initial
    @click="languageChangerVisible = true"
  >
    <img src="/img/language.svg" w-3rem alt="language" />
  </div>
  <Dialog v-model:visible="languageChangerVisible" modal :header="t('global.language')">
    <Listbox
      v-model="$i18n.locale"
      :options="$i18n.availableLocales"
      w-full
      
      @update:model-value="languageChangerVisible=false"
    >
      <template #option="slotProps">
        <div flex flex-items-center gap-2rem>
          <div rd-full overflow-hidden w-4rem h-4rem>
            <img
            :alt="slotProps.option"
            :src="`/img/${slotProps.option}.svg`"
            ml--2rem
            mt--1.5rem
            w-7rem
          />
          </div>
          
          <span>{{ slotProps.option }}</span>
        </div>
      </template>
    </Listbox>
  </Dialog>
</template>
<script setup lang="ts">
import { ref } from "vue";
import Dialog from "primevue/dialog";
import Listbox from "primevue/listbox";
import { useI18n } from "vue-i18n";
const languageChangerVisible = ref(false);
const { t } = useI18n();

</script>
