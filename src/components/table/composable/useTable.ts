import type { BaseModel } from "@/common/models/base/BaseModel";
import { ref, watchEffect, type Ref } from "vue";
import { useQueryOfAll } from "./useQueryOfAll";
import type { TableProps } from "../types/TableProps";
import type { DataTableFilterMeta } from "primevue";

export const useTable = <T extends BaseModel>({ queryOptions, model, customGetAllFunction, paginate }: TableProps<T>) => {
  const tableData = ref()
  const expandedRows = ref()
  const dataMode: Ref<'table' | 'cards'> = ref('table')
  const filters: Ref<DataTableFilterMeta> = ref({});
  const filterOptions = ref([
    { label: 'Contains', value: 'contains' }
  ])

  model.getFilters()?.forEach((f) => {
    filters.value[f.field] = { value: null, matchMode: 'contains', filterMode: f.filterMode, filterField: f.filterField ?? f.field }
  })

  const queryOfAll = useQueryOfAll({
    queryOptions,
    model,
    customGetAllFunction,
    paginate
  })

  watchEffect(() => {
    const { isSuccess, data, isPending, isRefetching } = queryOfAll
    if (isSuccess.value && data.value && !isPending.value && !isRefetching.value) {
      expandedRows.value = null
      tableData.value = data.value.data
    }
  });

  return {
    tableData,
    expandedRows,
    dataMode,
    filterOptions,
    filters,
    queryData: queryOfAll.data,
    ...queryOfAll
  }
};
