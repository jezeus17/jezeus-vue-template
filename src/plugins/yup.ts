import { setLocale, addMethod, string } from "yup";

declare module 'yup' {
    interface StringSchema {
        numeric(message?: string): this;
    }
}

addMethod(string, 'numeric', function (message = 'validations.numeric') {
    return this.matches(/^\d+$/, {
        message,
        excludeEmptyString: true
    });
});

const configureYup = (i18n: unknown) => {
    setLocale({
        mixed: {
            required: 'validations.required',
        },
        string: {
            length: ({ length }) => i18n.global.t('validations.length', { length }),
            max: ({ max }) => i18n.global.t('validations.max', { max }),
            numeric: () => i18n.global.t('validations.numeric'),
        },
        number: {
            min: ({ min }) => ({ key: 'error.field_too_short', values: { min } }),
            max: ({ max }) => ({ key: 'error.field_too_big', values: { max } }),
        },
    });
};
export * from "yup";
export { configureYup }