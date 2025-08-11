<template>

  <div :class="$attrs.class" min-w-20rem text-left flex flex-col gap-4>
    <Field v-model="model" :name="props.name" v-slot="{ meta, errors }">
      <label for="" v-if="props.label">
        <slot name="icon"></slot>{{ props.label }}
      </label>
      <div w-full flex gap-4 flex-wrap>

        <div flex items-center justify-center gap-2 v-for="option in props.options" :key="option">
          <RadioButton :inputId="option" :value="option" v-bind="{ ...$attrs }" v-model="model"
            :invalid="meta.validated && !meta.valid" />
          <label :for="option" flex items-center justify-center gap-2>
            {{ option }}
          </label>
        </div>
      </div>


      <div v-auto-animate>
        <small class="text-red-500" v-if="meta.validated && !meta.valid">{{ errors[0] ? $t(errors[0]) : '' }}</small>
      </div>
    </Field>
  </div>
</template>

<script setup lang="ts">
import { Field } from 'vee-validate';
import RadioButton from 'primevue/radiobutton';
import type { ModelRef } from 'vue';
const props = defineProps({
  label: { type: String },
  name: { type: String, required: true },
  options: { type: Array<string>, required: true }
});
const model = defineModel() as ModelRef<string>;

</script>
