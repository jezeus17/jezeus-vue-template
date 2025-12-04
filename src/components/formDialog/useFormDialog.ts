import type { FormDialogProps } from "./FormDialogProps";

function useFormDialog(uniqueId?: string) {
    const id = uniqueId ?? 'global'
    function addDialogListener(cb: EventListener) {
        window.addEventListener('form-dialog-open-' + id, cb);
    }
    function removeListener(cb: EventListener) {
        window.removeEventListener('form-dialog-open-' + id, cb);
    }

    function show<SubmitValues = unknown, ResponseValues = unknown>(data: FormDialogProps<SubmitValues, ResponseValues>) {
        const event = new CustomEvent('form-dialog-open-' + id, {
            detail: data
        });
        window.dispatchEvent(event);
    }

    return {
        addDialogListener,
        show,
        removeListener
    }
}

export default useFormDialog;