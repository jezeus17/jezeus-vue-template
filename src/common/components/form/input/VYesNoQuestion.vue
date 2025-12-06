<template>

  <div :class="$attrs.class" flex-1 text-left flex flex-col gap-4 justify-between>
    <Field v-model="model" :name="props.name" v-slot="{ meta, errors }">
      <label for="" v-if="props.label">
        <slot name="icon"></slot>{{ props.label }}
      </label>
      <SelectButton @change="handleChange" :allowEmpty="false" optionLabel="name" optionDisabled="disabled"
        v-model="localModel" v-bind="{ ...$attrs }" :options="options"
        :invalid="canValidate && meta.validated && !meta.valid" />
      <div v-auto-animate>
        <small class="text-red-500" v-if="meta.validated && !meta.valid">{{ errors[0] ? $t(errors[0]) : ''
        }}</small>
      </div>
    </Field>
  </div>
</template>

<script setup lang="ts">
import { Field } from 'vee-validate';
import { SelectButton, type SelectButtonChangeEvent } from 'primevue';
import { onMounted, ref, type ModelRef } from 'vue';
import { useI18n } from 'vue-i18n';
const props = defineProps({
  label: { type: String },
  name: { type: String, required: true },
  numbersAsValues: { type: Boolean, default: false },
  yesOption: { type: String },
  noOption: { type: String },
  default: { type: Boolean },
  canValidate: { type: Boolean, default: true },
  allowEmpty: { type: Boolean, default: true }
});
const emit = defineEmits(['change'])
const model = defineModel() as ModelRef<boolean>;
const localModel = ref()
const { t } = useI18n()

const options = ref([
  { name: props.yesOption ?? t('global.yes'), value: true, disabled: false },
  { name: props.noOption ?? t('global.no'), value: false, disabled: false }
]);


const handleChange = (e: SelectButtonChangeEvent) => {
  model.value = e.value.value
  emit('change', e.value.value)
  disableOption(e.value.value)

}
const disableOption = (newValue: boolean) => {
  if (!props.allowEmpty) {
    if (newValue === true) {
      options.value[0].disabled = true
      options.value[1].disabled = false
    } else if (newValue === false) {
      options.value[0].disabled = false
      options.value[1].disabled = true
    }
  }
}
disableOption(model.value)



onMounted(() => {
  if (props.default !== undefined)
    model.value = props.default
  localModel.value = model.value == true ? options.value[0] : model.value === false ? options.value[1] : undefined
})
</script>
