<template>
  <Dialog v-model:visible="dialogOpen" modal :header="$t(dialogProps?.dialogOptions?.title ?? '')"
    class="w-full m-4 max-w-[35rem]" @after-hide="cancel">
    <div v-if="dialogOpen" class="dialogContent">
      <p class="subtitle" v-if="dialogProps.dialogOptions.subtitle">
        {{ $t(dialogProps.dialogOptions.subtitle) }}
      </p>
      <Form ref="form" :validation-schema="dialogProps.validationSchema" class="formDialog" @submit="submit">
        <div class="dialog-form">
          <component :is="dialogContent" :retry="submit" v-bind="dialogProps.dialogOptions.contentProps"
            v-model="dialogProps.submitOptions.model" @submit="submit" />
        </div>
        <div class="dialog-footer">
          <Button type="button" :label="$t('global.cancel')" severity="secondary" @click="cancel"></Button>

          <Button :label="dialogProps.submitOptions.label ?? t('global.save')" type="submit" :disabled="pending"
            :loading="pending" />

        </div>

      </Form>
    </div>
  </Dialog>
</template>

<script lang="ts" setup generic="SubmitValues, ResponseValues">
import { Form } from 'vee-validate';
import { nextTick, ref, shallowRef, useTemplateRef, watch, type Ref } from 'vue';
import type { FormDialogProps } from './FormDialogProps';
import { useI18n } from 'vue-i18n';
import HttpError from '@/common/exceptions/HttpError';
import useFormDialog from './useFormDialog';
import { Button, Dialog, useToast } from 'primevue';
import { useTranslationHelper } from '@/common/composables/useTranslationHelper';
const dialogProps = ref() as Ref<FormDialogProps<SubmitValues, ResponseValues>>
const { uniqueId } = defineProps<{ uniqueId?: string }>()
const dialogContent = shallowRef()
const { t } = useI18n()
const toast = useToast()
const { getMessage } = useTranslationHelper()
const dialogOpen = ref(false)
const form = useTemplateRef('form')
const pending = ref(false)
useFormDialog(uniqueId).addDialogListener((event: CustomEventInit) => {
  dialogOpen.value = true
  dialogProps.value = event.detail
  dialogContent.value = event.detail.dialogOptions.content

});
const submit = async (values: unknown) => {
  pending.value = true
  try {
    const response = await dialogProps.value.submitOptions.action(values as SubmitValues)
    dialogOpen.value = false
    await nextTick()
    if (dialogProps.value.successOptions?.action) {

      dialogProps.value.successOptions.action({ submittedValues: values as SubmitValues, responseValues: response })
    }
    toast.add({
      summary: t('global.operation_succeded'),
      severity: "success",
      detail: t(dialogProps.value.successOptions?.message ?? 'global.operation_succeded'),
      life: 5000
    })


  } catch (err) {
    if (err instanceof Error) {
      if (dialogProps.value.errorOptions?.action)
        dialogProps.value.errorOptions.action({ submittedValues: values as SubmitValues, error: err })
      else {
        let message;
        if (dialogProps.value.errorOptions?.message)
          message = dialogProps.value.errorOptions.message
        else message = err instanceof HttpError ? err.message : 'error.unknown_error'
        toast.add({
          severity: "error",
          summary: t('error.error'),
          detail: getMessage(message, 'error'),
          life: 5000
        })
        console.log(err)
      }

    }

  }
  pending.value = false
}

const cancel = () => {
  if (dialogProps.value.cancelOptions?.action) {
    dialogProps.value.cancelOptions.action()
    dialogOpen.value = false
  }
}
watch(() => form.value?.meta.valid, (value) => {
  if (dialogProps.value.submitOptions.submitOnValid && value && form.value?.meta.dirty) {
    submit(form.value?.values)
  }
})
</script>

<style>
.dialog-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.dialog-footer {
  display: flex;
  gap: 1.5rem;
  justify-content: space-between;
}

.dialogContainer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: fit-content;
  height: fit-content;

  z-index: 2001;
  background-color: white;
  border-radius: var(--container-border-radius);
  min-width: 300px;
  max-width: 500px;
}

.dialogHeader,
.dialogFooter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--container-padding);
}

.dialogHeader h2 {
  margin: 0;
  font-weight: normal;
  font-size: 18px;
  font-weight: bold;
  font-family: var(--font-header);
}

.subtitle {
  font-weight: normal;
  font-size: 16px;

  width: 100%;
}

.dialogContent {
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 var(--container-padding);
}

.dialogBackground {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  z-index: 2000;
}

.formDialog {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  padding: var(--container-padding);
  gap: 12px;
}

.closeBtn {
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
  color: #6c757d;
  padding: var(--child-padding);
  border-radius: var(--child-border-radius);

  transition: background-color 0.2s;
}

.closeBtn:not(:disabled):focus {
  outline: solid 2px var(--light-color);
  outline-offset: 2px;
  border-color: var(--light-color);
  box-shadow: 0 0 0 3px #26316d1a;
}

.closeBtn:hover {
  background: #e9ecef;
  color: #495057;
}
</style>
