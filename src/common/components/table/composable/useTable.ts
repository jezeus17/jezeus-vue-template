import type { BaseModel } from "@/common/utils/models/base/BaseModel";
import { ref, watchEffect, type Ref } from "vue";
import { useQueryOfAll, type QueryOfAllResult } from "../../../composables/useQueryOfAll";
import type { TableProps } from "../types/TableProps";
import type { FilterMetadata } from "../types/Filter";
import type { ColumnFilterMatchModeOptions } from "primevue";
import { useQueryOfOne, type QueryOfOneResult } from "@/common/composables/useQueryOfOne";

export type TableMetadata = {
  tableData: Ref<unknown[]> | Ref<undefined, undefined>;
  expandedRows: Ref<unknown[]>;
  dataMode: Ref<'table' | 'cards'>;
  filterOptions: Ref<ColumnFilterMatchModeOptions[]>;
  filters: Ref<FilterMetadata>;
  fieldAsID: string;
  isLogicErase: boolean;
} & QueryOfAllResult & QueryOfOneResult


export function useTable<T extends BaseModel>({ queryOptions, model, customGetAllFunction, customGetOneFunction, paginate }: TableProps<T>): TableMetadata {
  const tableData = ref()
  const expandedRows = ref()
  const dataMode: Ref<'table' | 'cards'> = ref('table')
  const filters = ref({}) as Ref<FilterMetadata>;
  const filterOptions = ref([
    { label: 'Contains', value: 'contains' }
  ])
  const fieldAsID = model.getFieldAsID()
  const isLogicErase = model.getFieldAsActive() != ''

  model.getFilters()?.forEach((f) => {
    filters.value[f.field] = { value: null, matchMode: 'contains', filterMode: f.filterMode, filterField: f.field }
  })

  const queryOfAll = useQueryOfAll({
    queryOptions,
    model,
    customGetAllFunction,
    paginate
  })
  const queryOfOne = useQueryOfOne({
    model,
    queryOptions,
    customGetOneFunction
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
    fieldAsID,
    isLogicErase,
    ...queryOfAll,
    ...queryOfOne
  }
};
