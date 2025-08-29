function useEvents() {
    function addListener(name: string, cb: EventListener) {
        window.addEventListener(name, cb);
    }
    function removeListener(name: string, cb: EventListener) {
        window.removeEventListener(name, cb);
    }

    function dispatch(name: string, data?: unknown) {
        const event = new CustomEvent(name, {
            detail: data
        });
        window.dispatchEvent(event);
    }

    return {
        addListener,
        dispatch,
        removeListener
    }
}

export default useEvents;