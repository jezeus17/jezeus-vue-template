import type { Ref } from "vue";
import useEvents from "./useEvents";
import { i18n } from "@/plugins/i18n";
import type HttpError from "../exceptions/HttpError";

const handlePromise = async (promise: () => Promise<unknown>, loading: Ref<boolean>, callBackOnSuccess: () => void) => {
    loading.value = true
    const { t } = i18n.global
    promise().then(() => {
        useEvents().dispatch("error", {
            severity: "info",
            summary: t('global.operation_succeded'),
            detail: t('global.operation_succeded'),
            life: 3000,
        });
        callBackOnSuccess()
    }).catch((e: HttpError) => {
        console.log(e)
        useEvents().dispatch("error", {
            severity: "error",
            summary: "Error",
            detail: e.statusCode == 409 ? t('error.related_element') : t('global.error'),
            life: 3000,
        });
    }).finally(() => loading.value = false)
}

export default handlePromise