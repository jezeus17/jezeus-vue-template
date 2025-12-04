<template>
  <Dialog v-if="dialogOpen" v-model:visible="dialogOpen" modal
    :header="$t('global.information') + ' ' + $t(dialogProps.title)" class="w-full m-4 max-w-[35rem]">
    <div class="dialogContent">
      <LoadingPanel v-if="dialogProps.isPending || dialogProps?.isRefetching || dialogProps.isError" centered
        :loading="dialogProps.isPending || dialogProps?.isRefetching" :error="dialogProps.isError" :absolute="false"
        :refetch="dialogProps.retrieveInfoAction" />
      <template v-else-if="dialogProps.isSuccess">

        <p class="subtitle" v-if="dialogProps.subtitle">
          {{ $t(dialogProps.subtitle) }}
        </p>
        <div class="dialog-form">
          <component :is="dialogContent" v-bind="dialogProps.contentProps" v-model="dialogProps.model" />
        </div>
        <div class=" w-full flex flex-row justify-end">

          <Button :label="t('global.confirm')" type="button" @click="dialogOpen = false" />

        </div>
      </template>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref, shallowRef, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { Button, Dialog } from 'primevue';
import type { InfoDialogProps } from './InfoDialogProps';
import useInfoDialog from './useINfoDialog';
import LoadingPanel from '../ui/LoadingPanel.vue';
const dialogProps = ref() as Ref<InfoDialogProps>
const { uniqueId } = defineProps<{ uniqueId?: string }>()
const dialogContent = shallowRef()
const { t } = useI18n()
const dialogOpen = ref(false)
useInfoDialog(uniqueId).addDialogListener((event: CustomEventInit) => {
  dialogProps.value = event.detail
  dialogProps.value.retrieveInfoAction()
  dialogOpen.value = true
  dialogContent.value = event.detail.content
});
</script>

<style>
.dialog-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1.5rem;
  margin: 1.5rem 0;
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
