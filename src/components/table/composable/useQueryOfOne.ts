import type { BaseModel } from "@/common/models/base/BaseModel";
import { useQuery } from "@tanstack/vue-query";
import { watch } from "vue";

export const useQueryOfOne = ({ queryOptions, customGetOneFunction, model }: {
  model: BaseModel,
  queryOptions?: object,
  customGetOneFunction?: (id: number, queryOptions?: object) => Promise<object>
}) => {
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
