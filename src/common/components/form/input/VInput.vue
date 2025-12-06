<template>

  <div :class="$attrs.class">
    <Field v-model="model" :name="props.name" v-slot="{ meta, errors }">
      <FloatLabel variant="on">

        <IconField>

          <InputText v-if="props.validateAsync" :id v-bind="{ ...$attrs }" fluid v-model="searchQuery"
            :invalid="meta.validated && !meta.valid" />
          <InputNumber :id v-else-if="props.number" v-model="model" showButtons v-bind="{ ...$attrs }" fluid
            :invalid="meta.validated && !meta.valid" />
          <Textarea :id v-else-if="props.textarea" v-bind="{ ...$attrs }" fluid v-model="model"
            :invalid="meta.validated && !meta.valid" />
          <InputMask :id v-else-if="$attrs.mask" toggle-mask :mask="$attrs.mask" fluid v-bind="{ ...$attrs }"
            v-model="model" :invalid="meta.validated && !meta.valid" />
          <Password :id v-else-if="props.password" toggleMask :feedback="false" fluid v-bind="{ ...$attrs }"
            v-model="model" :invalid="meta.validated && !meta.valid" />
          <InputText :id v-else v-bind="{ ...$attrs }" fluid v-model="model" :invalid="meta.validated && !meta.valid" />

          <label :for="id" class="flex items-center justify-center gap-2">
            <slot name="icon"></slot>{{ props.label }}
          </label>
          <InputIcon v-if="props.validateAsync && meta.pending" class="pi pi-spin pi-spinner" />

        </IconField>
      </FloatLabel>


      <div v-auto-animate>
        <small class="text-red-500" v-if="meta.validated && !meta.valid">{{ errors[0] ? $t(errors[0]) : '' }}</small>
      </div>

    </Field>
  </div>
</template>

<script setup lang="ts">
import { Field } from 'vee-validate';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import Password from 'primevue/password';
import InputMask from 'primevue/inputmask';
import Textarea from 'primevue/textarea';
import InputNumber from 'primevue/inputnumber';
import { ref, type ModelRef } from 'vue';
import { IconField, InputIcon } from 'primevue';
import { watch } from 'vue';
const props = defineProps({
  id: String,
  label: { type: String, required: true },
  name: { type: String, required: true },
  textarea: Boolean,
  number: Boolean,
  password: Boolean,
  tooltip: String,
  validateAsync: Boolean

});
const model = defineModel() as ModelRef<string>;

const searchQuery = ref(model.value);

let timeout: NodeJS.Timeout;

watch(searchQuery, (newValue) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    model.value = newValue;
  }, 300);
});

</script>
