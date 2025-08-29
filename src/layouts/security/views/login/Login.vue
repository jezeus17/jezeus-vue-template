<script setup lang="ts">
import { onMounted, provide, ref } from "vue";
import { useI18n } from "vue-i18n";
import { siteStore } from "@/common/site/siteStore";
import VInput from "@/components/form/input/VInput.vue";
import { Form } from "vee-validate";
import { loginSchema } from "./loginSchema";
import { Button, Card, Dialog, Divider } from "primevue";
import useEvents from "@/common/composables/useEvents";
import VSelect from "@/components/form/input/VSelect.vue";
import { selectGroupSchema } from "./selectGroupSchema";
import { useQueryClient } from "@tanstack/vue-query";
const { t } = useI18n();
const queryClient = useQueryClient()

const credentials = ref({
  email: "",
  password: "",
});

const selectedGroup = ref()
const temporalToken = ref()
const visible = ref(false)
const groups = ref([])



const login = siteStore().useLogin();




const onSubmitLogin = () => {
  login.login(credentials.value)
}
const onSubmitSelectGroup = () => {
  login.selectGroup(selectedGroup.value, temporalToken.value)
}
useEvents().addListener("login", (event) => {
  visible.value = true
  groups.value = event.detail.groups
  temporalToken.value = event.detail.temporalToken
});

const canValidate = ref(false)
provide("canValidate", canValidate)

window.scrollTo(0, 0);
onMounted(() => {
  queryClient.resetQueries();
})
</script>


<template>
  <main class="gradient-background flex items-center justify-center overflow-hidden">


    <Card class=" w-full max-w-[25rem]">
      <template #content>

        <div class="overflow-hidden flex h-full flex-col">
          <div class="flex items-center flex-col">
            <!-- <img src="/img/logo.png" w-8rem /> -->
            <h1 class="text-xl mt-8 w-full m-0 font-bold text-center">
              {{ t("title") }}
            </h1>
          </div>
          <Form @submit="onSubmitLogin" class="flex h-fit justify-between flex-col" :validation-schema="loginSchema">

            <div class="flex flex-col gap-8 my-8">

              <VInput class="h-10" name="email" id="email-input" :max="8" v-model="credentials.email"
                :label="t('email')">
                <template #icon>
                  <span class="pi pi-envelope"></span>

                </template>
              </VInput>
              <VInput class="h-10" name="password" id="password-input" :max="8" password v-model="credentials.password"
                :label="t('password')">
                <template #icon>
                  <i class="pi pi-lock"></i>

                </template>

              </VInput>
            </div>



            <Button icon="pi pi-sign-in" icon-pos="right" type="submit" id="login-button" :label="t('login')"
              :loading="login.loading" />
            <Divider layout="horizontal" class="flex" align="center"><b>{{ t('or') }}</b></Divider>


            <Button variant="outlined" asChild v-slot="slotProps">
              <RouterLink :class="slotProps.class + ' !no-underline !hover:no-underline !visited:no-underline'"
                to="/sign-up">{{
                  t('sign-up')
                }}</RouterLink>
            </Button>
          </Form>
        </div>
      </template>

    </Card>
    <Dialog v-model:visible="visible" modal :header="t('select-group-title')" class="w-4/5 max-w-50rem min-w-25rem">
      <Form @submit="onSubmitSelectGroup" :validation-schema="selectGroupSchema">
        <div class="dialog-form">

          <VSelect w-full v-model="selectedGroup" optionId="id_group" optionLabel="name" name="group"
            :label="t('select-group')" :options="groups">
            <template #option="slotProps">

              <p m-0>{{ slotProps.slotProps.option.name }} ({{ $t('roles.' + slotProps.slotProps.option.role) }})</p>

            </template>
            <template #value="slotProps">
              <div v-if="slotProps.slotProps.value" class="flex">{{ slotProps.slotProps.value?.name }} ({{
                $t('roles.' + slotProps.slotProps.value?.role) }}) </div>
              <span class="h-6 flex items-center" v-else>
                {{ slotProps.slotProps.placeholder }}
              </span>
            </template>
          </VSelect>

        </div>

        <div class="dialog-footer">
          <Button type="button" :label="$t('global.cancel')" severity="secondary" @click="visible = false"></Button>

          <Button w-8rem type="submit" :loading="login.loading" :label="$t('global.select')" />
        </div>
      </Form>
    </Dialog>
  </main>
</template>



<style>
.title {
  background: -webkit-linear-gradient(45deg, #96dcff, #2388bb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
<i18n lang="json">{
  "es": {
    "email": "Email",
    "password": "Contraseña",
    "title": "Iniciar Sesión",
    "login": "Iniciar Sesión",
    "sign-up": "Regístrate como nuestro cliente",
    "select-group": "Seleccione el grupo donde desea trabajar",
    "select-group-title": "Seleccionar grupo",
    "or": "O"
  },
  "en": {
    "email": "Email",
    "password": "Password",
    "title": "Sign In",
    "login": "Get Started",
    "sign-up": "Register as our client",
    "select-group": "Select the group where you want to work",
    "select-group-title": "Select group",
    "or": "OR"
  }
}</i18n>
