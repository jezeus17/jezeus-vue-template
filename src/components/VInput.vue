<template>

  <div :class="$attrs.class">
    <Field v-model="model" :name="props.name" v-slot="{ meta, errors }">
      <InputGroup>

        <FloatLabel variant="on">
          <InputNumber :id v-if="props.number" v-model="model" showButtons v-bind="{ ...$attrs }" fluid
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
        </FloatLabel>
        <InputGroupAddon v-if="props.tooltip">
          <i cursor-pointer class="pi pi-info-circle"></i>
        </InputGroupAddon>
      </InputGroup>

      <Transition name="fast-fade">
        <small class="text-red" v-if="meta.validated && !meta.valid">{{ errors[0] ? $t(errors[0]) : '' }}</small>
      </Transition>

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
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import type { ModelRef } from 'vue';
const props = defineProps({
  id: String,
  label: { type: String, required: true },
  name: { type: String, required: true },
  textarea: Boolean,
  number: Boolean,
  password: Boolean,
  tooltip: String

});
const model = defineModel() as ModelRef<string>;

</script>
