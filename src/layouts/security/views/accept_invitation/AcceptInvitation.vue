<script setup lang="ts">
import { onMounted, provide, ref } from "vue";
import { useI18n } from "vue-i18n";
import { Button, Card, useToast } from "primevue";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { sendRequest } from "@/common/utils/sendRequest";
import { useRoute } from "vue-router";
import router from "@/router";
const { t } = useI18n();
const queryClient = useQueryClient()
const toast = useToast()
const route = useRoute()





const { mutate, isPending } = useMutation({
  mutationKey: [`accept-invitation`],
  mutationFn: () => {
    const encodedToken = route.query.token as string
    const decodedToken = JSON.parse(atob(encodedToken.split('.')[1]))
    console.log(decodedToken)
    return sendRequest({ url: 'user/accept-invitation', method: "POST", token: encodedToken, body: { ...decodedToken, iat: undefined } })

  },
  onSuccess: (data) => {

    if (data.status == 401) {
      toast.add({ severity: 'error', summary: t('global.operation_failed'), detail: t('wrong_password'), life: 5000 });
    } else {
      router.push('login')
      toast.add({ severity: 'info', summary: t('global.operation_succeded'), detail: t('global.operation_succeded'), life: 5000 });
    }
  },

  onError: (error) => {
    toast.add({ severity: 'error', summary: t('global.operation_failed'), detail: t(error.message), life: 5000 });
  }
})



const canValidate = ref(false)
provide("canValidate", canValidate)

window.scrollTo(0, 0);
onMounted(() => {
  queryClient.resetQueries();
})
</script>


<template>
  <main centered overflow-hidden class="gradient-background">


    <Card anim-slide-in-from-bottom-1 w-full max-w-30rem>
      <template #content>

        <div overflow-hidden flex h-full flex-col anim-fade-in-1>
          <div flex items-center flex-col>
            <img src="/img/logo.png" w-8rem />
            <h1 text-xl mt-8 w-full m-0 font-bold text-center>
              {{ t("title") }}
            </h1>
            <p>{{ t('invitation') }}</p>
          </div>



          <div class="flex gap-12">
            <Button icon="pi pi-times" @click="router.push('login')" icon-pos="right" w-full severity="danger"
              :label="t('global.cancel')" />
            <Button icon="pi pi-sign-in" icon-pos="right" w-full :label="$t('global.confirm')" @click="() => mutate()"
              :loading="isPending" />
          </div>



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
    "title": "Invitación a unirse al grupo",
    "invitation": "¡Has recibido una invitación para unirte al grupo '{nombre_grupo}'! ¿Deseas aceptar y formar parte de este equipo?"
  },
  "en": {
    "title": "Group Invitation",
    "invitation": "You've been invited to join the group '{group_name}'! Would you like to accept and become part of this team?"
  }
}</i18n>
