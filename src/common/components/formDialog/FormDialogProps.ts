import { Schema } from "@/common/plugins/yup"
export type FormDialogProps<SubmitValues, ResponseValues> = {
    dialogOptions: {
        title: string;
        subtitle?: string;
        content: unknown;
        contentProps?: object;
    };
    submitOptions: {
        model: SubmitValues;
        label?: string;
        action: (values: SubmitValues) => Promise<ResponseValues>;
        submitOnValid?: boolean
    };
    successOptions?: {
        action?: (values: { submittedValues: SubmitValues; responseValues: ResponseValues }) => void;
        message?: string;
    };
    cancelOptions?: {
        action?: () => void;
    };
    errorOptions?: {
        action?: (values: { submittedValues: SubmitValues; error: Error }) => void;
        message?: string;
    };
    validationSchema: Schema;
}