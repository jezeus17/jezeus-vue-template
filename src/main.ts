import { createApp } from "vue";
import PrimeVue from 'primevue/config';
import { createPinia } from "pinia";
import "./assets/main.css";
import App from "./App.vue";
import router from "./router";
import ToastService from 'primevue/toastservice';
import DialogService from 'primevue/dialogservice';
import "primeicons/primeicons.css";
import { ConfirmationService, Ripple, Tooltip } from "primevue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import type { VueQueryPluginOptions } from "@tanstack/vue-query";
import { MyPreset } from "./plugins/primevue-preset";
import { i18n } from "./plugins/i18n";
import VLoading from "./components/VLoading.vue";
import VInput from "./components/VInput.vue";
import VError from "./components/VError.vue";
import 'reflect-metadata';

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
app.component("VLoading", VLoading);
app.component("VInput", VInput);
app.component("VError", VError);
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
