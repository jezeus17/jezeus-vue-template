import type { BaseModel } from "@/common/utils/models/BaseModel";
import { useQuery } from "@tanstack/vue-query";

export const useQueryOfOne = (
  queryKey: string,
  model: BaseModel,
  queryOptions?: object,
  customFunction?: (id: number, queryOptions?: object) => void
) => {
  const {
    data: dataOfOne,
    isPending: isPendingOfOne,
    isSuccess: isSuccessOfOne,
    isError: isErrorOfOne,
    error: errorOfOne,
    isRefetching: isRefetchingOfOne,
    refetch: refetchOfOne,
  } = useQuery({
    queryKey: [queryKey + "-one"],
    queryFn: () => customFunction ? customFunction(model.getID(), queryOptions) : model.getOne(queryOptions),
    enabled: false,
  });
  return {
    dataOfOne,
    isPendingOfOne,
    isSuccessOfOne,
    errorOfOne,
    isErrorOfOne,
    refetchOfOne,
    isRefetchingOfOne,
  };
};
