<script setup lang="ts">
import { RouterView, useRouter } from "vue-router";
import Toast from "primevue/toast";

import ConfirmDialog from "primevue/confirmdialog";
import ConfirmPopup from "primevue/confirmpopup";
import DynamicDialog from "primevue/dynamicdialog";
import useEvents from "./common/utils/useEvents";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";

import { useI18n } from "vue-i18n";
import { ref } from "vue";
import Dialog from "primevue/dialog";
import { useQueryClient } from "@tanstack/vue-query";

const router = useRouter();
const toast = useToast();
const confirm = useConfirm();
useQueryClient()

const { t } = useI18n();
const infoDialog = ref(
  { message: '', visible: false }
)
useEvents().addListener("error", (event: CustomEventInit) => {
  const eventDetail = event.detail;
  if (eventDetail.i18n) {
    toast.add({
      severity: eventDetail.severity,
      summary: eventDetail.summary,
      detail: t(eventDetail.detail),
      life: 5000,
    });
  } else toast.add(eventDetail);
});
useEvents().addListener("redirect", (event: CustomEventInit) => {
  router.push(event.detail);
  toast.removeAllGroups();
});
useEvents().addListener("confirm", (event: CustomEventInit) => {
  confirm.require({
    ...event.detail,
    rejectProps: {
      label: t('global.cancel'),
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: t('global.confirm'),
    },
  });
});
useEvents().addListener("info", (event: CustomEventInit) => {
  infoDialog.value.message = event.detail.message
  infoDialog.value.visible = true
});





useEvents().addListener("clean-toast", toast.removeAllGroups);
</script>
<template>

  <router-view />
  <Toast position="top-left" />
  <ConfirmDialog />
  <ConfirmPopup group="popup" />
  <DynamicDialog />
  <!-- <VueQueryDevtools /> -->
  <Dialog v-model:visible="infoDialog.visible" modal :header="t('global.info')">
    {{ infoDialog.message }}
  </Dialog>
</template>
