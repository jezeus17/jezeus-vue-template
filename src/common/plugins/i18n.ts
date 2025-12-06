import { createI18n } from "vue-i18n";
import messages from "@intlify/unplugin-vue-i18n/messages";
import { setLocale } from 'yup';


export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: window.navigator.language.substring(0, 2) || "es",
  fallbackLocale: "en",
  availableLocales: ["es", "en"],
  messages: messages,
});


setLocale({
  // use constant translation keys for messages without values
  mixed: {
    required: 'error.empty',
  },
  string: {
    email: 'error.email',


  },
  // use functions to generate an error object that includes the value from the schema
  number: {
    min: ({ min }) => ({ key: 'error.field_too_short', values: { min } }),
    max: ({ max }) => ({ key: 'error.field_too_big', values: { max } }),
  },

});