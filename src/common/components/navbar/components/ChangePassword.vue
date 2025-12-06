<template>

  <Dialog v-model:visible="visible" @after-hide="cleanForm" modal :header="t('title')"
    class="w-4/5 max-[w-50rem] min-[w-25rem]">

    <span>{{ t('subtitle') }}</span>
    <Form @submit="() => changePassword()" :validation-schema="schema">
      <div class="dialog-form">

        <VInput name="old_password" :max="8" type="old_password" v-model="credentials.old_password"
          :label="t('old_password')" />
        <VInput name="new_password" :max="8" type="password" v-model="credentials.new_password"
          :label="t('new_password')" />
        <VInput name="confirm_password" :max="8" type="password" v-model="credentials.confirm_password"
          :label="t('confirm_password')" />

      </div>

      <div class="dialog-footer">
        <Button type="button" :label="$t('global.cancel')" severity="secondary" @click="visible = false"></Button>

        <Button w-8rem type="submit" :loading="isAddPending" :label="$t('global.save')" />

      </div>
    </Form>

  </Dialog>
</template>
<script setup lang="ts">
import { sendRequest } from '@/common/http/sendRequest';
import VInput from '@/components/form/input/VInput.vue';
import { useMutation } from '@tanstack/vue-query';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import { useToast } from 'primevue/usetoast';
import { Form } from 'vee-validate';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { object, string, ref as yupRef } from 'yup';
const toast = useToast()
const visible = defineModel()
const { t } = useI18n()

const schema = object({
  old_password: string().required().min(6),
  new_password: string().required().min(6),

  confirm_password: string().required().oneOf([yupRef('new_password'), null], 'Las contraseñas no coinciden'),
});

const credentials = ref({
  old_password: "",
  new_password: "",
  confirm_password: ""
});
const cleanForm = () => {
  credentials.value.new_password = ''
  credentials.value.old_password = ''
  credentials.value.confirm_password = ''
}

const { mutate: changePassword, isPending: isAddPending } = useMutation({
  mutationKey: [`change-password`],
  mutationFn: (value) => sendRequest({
    url: `change_password`,
    body: { new_password: value.new_password, old_password: value.old_password },
    method: 'PATCH'
  }),
  onSuccess: (data) => {
    if (data.status == 401) {
      toast.add({ severity: 'error', summary: t('global.operation_failed'), detail: t('wrong_password'), life: 5000 });
    } else {
      toast.add({ severity: 'info', summary: t('global.operation_succeded'), detail: t('global.operation_succeded'), life: 5000 });
      visible.value = false
    }
  },

  onError: (error) => {
    toast.add({ severity: 'error', summary: t('global.operation_failed'), detail: t(error.message), life: 5000 });
  }
})


</script>

<i18n lang="json">{
  "es": {
    "title": "Cambio de Contraseña",
    "subtitle": "Introduzca su anterior contraseña, la nueva contraseña y confírmela:",
    "new_password": "Nueva Contraseña",
    "old_password": "Contraseña Anterior",
    "confirm_password": "Confirmar Contraseña",
    "wrong_password": "La contraseña actual no coincide con la insertada"
  },
  "en": {
    "title": "Password Change",
    "subtitle": "Enter your old password, new password and confirm it:",
    "new_password": "New Password",
    "old_password": "Old Password",
    "confirm_password": "Confirm Password",
    "wrong_password": "The current password doesn't match the entered one"
  }
}</i18n>
