import { createApp } from "vue";
import PrimeVue from 'primevue/config';
import { createPinia } from "pinia";
import "./assets/main.css";
import App from "./App.vue";
import router from "./common/router";
import ToastService from 'primevue/toastservice';
import DialogService from 'primevue/dialogservice';
import "primeicons/primeicons.css";
import { ConfirmationService, Ripple, Tooltip } from "primevue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import type { VueQueryPluginOptions } from "@tanstack/vue-query";
import { MyPreset } from "./common/plugins/primevue-preset";
import { i18n } from "./common/plugins/i18n";
import 'reflect-metadata';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'


const app = createApp(App);
const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  },
};
app.use(VueQueryPlugin, vueQueryPluginOptions);
app.use(autoAnimatePlugin)
app.directive("ripple", Ripple);
app.directive("tooltip", Tooltip);

app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
    options: {
      darkModeSelector: '.dark',
      cssLayer: false,
    },
  },
  ripple: true,
});
app.use(ToastService);
app.use(ConfirmationService);
app.use(DialogService);
app.use(i18n);
app.use(createPinia());
app.mount("#app");
