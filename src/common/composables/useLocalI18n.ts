import { i18n } from "@/plugins/i18n";
import { createI18n } from "vue-i18n";

export const useLocalI18n = (localMessages: object) => {
  const { locale } = i18n.global;
  const localI18n = createI18n({
    locale: locale.value,
    messages: localMessages,
    legacy: false,
  });
  const { t } = localI18n.global;
  return t
};
