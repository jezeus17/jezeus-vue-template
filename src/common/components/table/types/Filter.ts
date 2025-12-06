import type { DataTableFilterMetaData } from "primevue"

export type FilterMetadata = {
    [s: string]: string | DataTableFilterMetaData | {
        filterMode: string,
        filterField: string,
        value: string,
        matchMode: string
    },

}