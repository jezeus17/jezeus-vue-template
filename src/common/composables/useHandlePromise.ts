import { ref, type Ref } from "vue";

export default function useHandlePromise<GenericResponse>({ asyncFunction, inmediate = true }: { asyncFunction: (values?: unknown) => Promise<GenericResponse>, inmediate?: boolean }) {
    const data: Ref<GenericResponse | undefined> = ref()
    const error = ref(false)
    const errorMessage = ref()
    const loading = ref(false)

    const request = async (values?: unknown) => {
        error.value = false
        loading.value = true
        errorMessage.value = null
        try {
            const response = await asyncFunction(values)
            data.value = response
            loading.value = false
            return response
        } catch (e) {
            errorMessage.value = e instanceof Error ? e.message : "error.unknown_error"
            error.value = true
        }
        loading.value = false
    }
    if (inmediate)
        request()
    return { data, error, retry: request, loading }
}