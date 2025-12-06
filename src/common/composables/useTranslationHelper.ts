import { i18n } from "@/common/plugins/i18n"


export function useTranslationHelper() {
    const { t, te } = i18n.global

    const getMessage = (message: string, prefix: string) => {
        const errorKey = `${prefix}.${message}`
        if (te(errorKey)) {
            return t(errorKey)
        }

        if (te(message)) {
            return t(message)
        }

        return message
    }

    return { getMessage }
}