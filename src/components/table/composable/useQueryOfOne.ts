import type { BaseModel } from "@/common/models/base/BaseModel";
import type { BaseService } from "@/common/models/base/BaseService";
import { useQuery } from "@tanstack/vue-query";

export const useQueryOfOne = (
  queryKey: string,
  service: BaseService<BaseModel>,
  queryOptions?: object,
  customFunction?: (id: number, queryOptions?: object) => Promise<object>
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
    queryFn: () => customFunction ? customFunction(service.getModel().getID() as number, queryOptions) : service.getSelf(queryOptions),
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
