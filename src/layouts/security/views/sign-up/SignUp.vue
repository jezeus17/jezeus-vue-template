<script setup lang="ts">
import { provide, ref } from "vue";
import { useI18n } from "vue-i18n";
import { siteStore } from "@/common/site/siteStore";
import Button from "primevue/button";
import VInput from "@/components/VInput.vue";
import { Form } from "vee-validate";
import { signUpSchema } from "./signUpSchema";
import { User } from "@/modules/management/users/models/user.model";
import VRadioButton from "@/components/VRadioButton.vue";
import VSelect from "@/components/VSelect.vue";
import { sendRequest } from "@/common/utils/sendRequest";
import { useMutation } from "@tanstack/vue-query";
import { useToast } from "primevue/usetoast";
import { Card, Divider } from "primevue";
import { RouterLink } from "vue-router";
import router from "@/router";
import { useCountries } from "@/modules/management/country/composables/useCountries";

const { t } = useI18n();
const toast = useToast()
const login = siteStore().useLogin();
const { countries } = useCountries()


const canValidate = ref(false)
provide("canValidate", canValidate)
const user = ref(new User())

const { mutate: signUp, isPending } = useMutation({
  mutationKey: [`sign-up`],
  mutationFn: async (value: object) => {
    const body = {
      user: { ...value },
      group:
      {
        name_group: value.name_group
      },

    };
    delete body.user.name_group;
    return await sendRequest({
      method: "POST",
      url: `sign_in`,
      body: body,
    });
  },
  onSuccess: async (data) => {
    //await login.selectGroupRequestHandler(data)
    router.push('/login')
    toast.add({ severity: 'info', summary: t('global.operation_succeded'), detail: t('correct_register'), life: 8000 });


  },
  onError: (error) => {
    console.log(error)
    if (error.message.includes('email'))
      toast.add({ severity: 'error', summary: t('global.operation_failed'), detail: t('error.existent_email'), life: 5000 });
    else toast.add({ severity: 'error', summary: t('global.operation_failed'), detail: t('error.operation_failed'), life: 5000 });
  }
})



window.scrollTo(0, 0);
</script>


<template>
  <main centered overflow-hidden class="gradient-background">


    <Card anim-slide-in-from-bottom-1 w-full max-w-25rem>
      <template #content>

        <div overflow-hidden flex h-full flex-col anim-fade-in-1>
          <div flex items-center flex-col>
            <img src="/img/logo.png" w-8rem />
            <h1 text-xl mt-8 w-full m-0 font-bold text-center>
              {{ t("title") }}
            </h1>
          </div>
          <Form @submit="signUp" flex-col :validation-schema="signUpSchema">

            <div overflow-auto flex flex-col gap-8 my-8 p-2 max-h-25rem>
              <VInput v-model="user.email" name="email" :label="t('email')" />
              <VInput v-model="user.password" password name="password" :label="t('password')" />


              <VInput v-model="user.CI" name="CI" mask="99999999999" :label="t('ci')" />


              <VInput v-model="user.name" name="name" :label="t('name')" />

              <VInput v-model="user.last_name" name="last_name" :label="t('lastname')" />


              <VRadioButton :label="t('sex')" v-model="user.sex" name="sex" :options="['F', 'M']" />
              <VSelect v-model="user.country_id" name="country_id" :label="t('country')" :options="countries"
                optionLabel="name" optionId="country_id" />
              <VInput v-model="user.name_group" name="name_group" :label="t('group')" />
              <div>

                <Button w-full type="submit" :loading="login.loading || isPending" :label="t('sign-up')" />
                <Divider layout="horizontal" class="flex" align="center"><b>{{ t('or') }}</b></Divider>

                <Button w-full variant="outlined" asChild v-slot="slotProps">
                  <RouterLink w-full
                    :class="slotProps.class + ' !no-underline !hover:no-underline !visited:no-underline'" to="/sign-in">
                    {{
                      t('login')
                    }}</RouterLink>
                </Button>
              </div>
            </div>




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
    "title": "Regístrate en nuestro sistema",
    "login": "Iniciar Sesión",
    "sign-up": "Regístrate",
    "name": "Nombre",
    "lastname": "Apellidos",
    "ci": "Identificación",
    "email": "Email",
    "sex": "Sexo",
    "country": "País",
    "group": "Nombre de tu organización/entidad",
    "or": "¿Ya tienes cuenta?",
    "correct_register": "Su solicitud de registro ha sido completada. Le confirmaremos cuando aceptemos su solicitud."
  },
  "en": {
    "user": "User",
    "password": "Password",
    "title": "Sign Up",
    "sign-up": "Sign up",
    "login": "Log In",
    "name": "Name",
    "lastname": "Lastname",
    "ci": "ID Card",
    "email": "Email",
    "country": "Country",
    "sex": "Sex",
    "group": "Name of your organization/bussiness",
    "or": "Do you have an account?",
    "correct_register": "Your registration request has been completed. We will confirm when we accept your request."
  }
}</i18n>