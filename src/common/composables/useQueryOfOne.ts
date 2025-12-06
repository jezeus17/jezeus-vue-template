import type { BaseModel } from "@/common/utils/models/base/BaseModel";
import { useQuery, type QueryObserverResult, type RefetchOptions } from "@tanstack/vue-query";
import { watch, type Ref } from "vue";

export type QueryOfOneResult = {
  queryKeyOfOne: string;
  dataOfOne: Ref<unknown, unknown> | Ref<undefined, undefined>;
  refetchOfOne: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<unknown, Error>>
  isPendingOfOne: Ref<false, false> | Ref<true, true>;
  isSuccessOfOne: Ref<false, false> | Ref<true, true>;
  isErrorOfOne: Ref<false, false> | Ref<true, true>;
  errorOfOne: Ref<Error, Error> | Ref<null, null>;
  isRefetchingOfOne: Ref<false, false> | Ref<true, true>;
}

export function useQueryOfOne({ queryOptions, customGetOneFunction, model }: {
  model: BaseModel,
  queryOptions?: object,
  customGetOneFunction?: (id: number, queryOptions?: object) => Promise<object>
}): QueryOfOneResult {
  const queryKeyOfOne = `${model.constructor.name}-one`

  const {
    data: dataOfOne,
    isPending: isPendingOfOne,
    isSuccess: isSuccessOfOne,
    isError: isErrorOfOne,
    error: errorOfOne,
    isRefetching: isRefetchingOfOne,
    refetch: refetchOfOne,
  } = useQuery({
    queryKey: [queryKeyOfOne],
    queryFn: () => customGetOneFunction ? customGetOneFunction(model.getID() as number, queryOptions) : model.getSelf(queryOptions),
    enabled: false
  });

  watch(dataOfOne, (newValue) => {
    if (newValue)
      model.setData(newValue)
  })
  return {
    queryKeyOfOne,
    dataOfOne,
    isPendingOfOne,
    isSuccessOfOne,
    errorOfOne,
    isErrorOfOne,
    refetchOfOne,
    isRefetchingOfOne,
  };
};
