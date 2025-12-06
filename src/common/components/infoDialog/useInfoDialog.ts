import type { InfoDialogProps } from "./InfoDialogProps";

function useInfoDialog(uniqueId?: string) {
    const id = uniqueId ?? 'global'
    function addDialogListener(cb: EventListener) {
        window.addEventListener('info-dialog-open-' + id, cb);
    }
    function removeListener(cb: EventListener) {
        window.removeEventListener('info-dialog-open-' + id, cb);
    }

    function show(data: InfoDialogProps) {
        const event = new CustomEvent('info-dialog-open-' + id, {
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

export default useInfoDialog;