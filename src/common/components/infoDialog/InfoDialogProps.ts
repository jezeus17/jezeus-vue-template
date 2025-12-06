import type { Ref } from "vue";

export type InfoDialogProps = {
    title: string;
    subtitle?: string;
    content: unknown;
    contentProps?: object;
    isPending: Ref<boolean>;
    isRefetching: Ref<boolean>;
    isError: Ref<boolean>;
    isSuccess: Ref<boolean>
    retrieveInfoAction: () => Promise<unknown>
    model: unknown;
}