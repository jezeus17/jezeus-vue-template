<script setup lang="ts">
import {  provide, ref } from "vue";
import { useI18n } from "vue-i18n";
import { siteStore } from "@/common/site/siteStore";
import VInput from "@/components/VInput.vue";
import { Form } from "vee-validate";
import { loginSchema } from "./loginSchema";
import { Button, Card } from "primevue";
const { t } = useI18n();

const credentials = ref({
  email: "",
  password: "",
});

const login = siteStore().useLogin();
const canValidate = ref(false)
provide("canValidate", canValidate)

window.scrollTo(0, 0);
</script>


<template>
  <main centered class="gradient-background">
    <!--<div fixed left-0.5rem top-0.5rem>
      <VLanguageChanger />
    </div>-->

    <Card anim-slide-in-from-bottom-1 h-fit>
      <template #content>

        <div overflow-hidden flex h-full flex-col anim-fade-in-1>
          <div flex items-center flex-col mb-2>
            <img src="/img/logo.png" w-6rem h-20 mb-2 />
            <h1 text-3xl h-20 w-full m-0 font-bold text-center text-primary>
              {{ t("title") }}
              Selecciona el grupo donde deseas trabajar
            </h1>
          </div>
          <Form @submit="login.login(credentials)" flex h-12rem justify-between flex-col
            :validation-schema="loginSchema">

            <div flex flex-col gap-8>

              
              
            </div>


            
            <Button w-full type="submit" id="login-button" :label="t('login')" :loading="login.loading"/>
            <!-- <RouterLink  text-primary to="/sign-up">{{ $t('login.sign-up') }}</RouterLink> -->
          </Form>
        </div>
      </template>

    </Card>
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
    "user": "Usuario",
    "password": "Contraseña",
    "title": "Bienvenido a TestSoft",
    "login": "Iniciar Sesión",
    "sign-up": "Regístrate como nuestro cliente"
  },
  "en": {
    "user": "User",
    "password": "Password",
    "title": "Welcome to TestSoft",
    "login": "Log In",
  }
}</i18n>
