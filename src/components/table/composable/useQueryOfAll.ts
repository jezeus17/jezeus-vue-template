import type { BaseModel } from "@/common/models/base/BaseModel";
import type { PaginatedResponseData, ResponseData } from "@/common/types/ResponseData";
import { useQuery } from "@tanstack/vue-query";
import type { DataTableSortEvent } from "primevue";
import { ref, watch, watchEffect } from "vue";

export const useQueryOfAll = ({ queryOptions, model, customGetAllFunction, paginate }: {
  paginate?: boolean
  model: BaseModel,
  queryOptions?: object,
  customGetAllFunction?: (data: unknown) => Promise<ResponseData | PaginatedResponseData>
}

) => {
  const limit = ref(10)
  const offset = ref(0)
  const totalRecords = ref(0)
  const totalPages = ref(0)
  const globalFilter = ref('');
  const sortOptions = ref({ column: '', direction: 'asc' })
  const filtersForServer = ref({});
  const queryKey = model.constructor.name


  const {
    data,
    isPending,
    isSuccess,
    isError,
    error,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: [queryKey],
    queryFn: () => {
      const baseParams = {
        ...queryOptions,
        filters: { ...filtersForServer.value },
        globalFilter: globalFilter.value,
        orderBy: sortOptions.value
      };

      const paginationParams = paginate ? {
        limit: limit.value,
        offset: offset.value
      } : {};

      const requestParams = { ...baseParams, ...paginationParams };
      if (customGetAllFunction)
        return customGetAllFunction(requestParams)
      else if (paginate)
        return model.getAllPaginated(requestParams)
      else return model.getAll(requestParams)
    }
  })



  const onSortChange = (e: DataTableSortEvent) => {
    if (typeof e.sortField == 'string') {
      sortOptions.value.column = e.sortField
      sortOptions.value.direction = e.sortOrder === 1 ? 'asc' : 'desc'
      refetch()
    }
  }

  const onFilter = (event: { filters: { [s: string]: unknown; } | ArrayLike<unknown>; }) => {
    filtersForServer.value = {}
    Object.entries(event.filters).map((f) => {
      if (f[1].value !== null && f[1].value !== undefined) {
        switch (f[1].filterMode) {
          case 'like' || '=':
            filtersForServer.value[f[1].filterField] = f[1].value
            break;
          // case 'date':
          //   {

          //     const date = new Date(f[1].value);
          //     const year = date.getFullYear();
          //     const month = String(date.getMonth() + 1).padStart(2, '0');
          //     const day = String(date.getDate()).padStart(2, '0');

          //     const formattedDate = `${year}-${month}-${day}`;
          //     filtersForServer.value[f[1].filterField] = `like %${formattedDate}%`
          //     break;
          //   }
        }

      }

    })
    refetch()
  }

  watch(globalFilter, () => refetch())

  watchEffect(() => {
    if (isSuccess.value && data.value && !isPending.value && !isRefetching.value) {
      totalRecords.value = data.value.elements_amount
      totalPages.value = data.value.pages
    }
  });

  return {
    queryKey,
    data,
    isPending,
    isSuccess,
    isError,
    error,
    isRefetching,
    refetch,
    limit,
    totalRecords,
    totalPages,
    offset,
    filtersForServer,
    globalFilter,
    onSortChange,
    onFilter
  }
};
