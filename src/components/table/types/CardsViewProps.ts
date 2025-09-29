import type { BaseModel } from "@/common/models/base/BaseModel";
import type { BaseService } from "@/common/models/base/BaseService";
import type { PaginatedResponseData } from "@/common/types/ResponseData";

export default interface CardsViewProps<T extends BaseModel> {
  service: BaseService<T>,
  refetch: () => Promise<unknown>,
  data: PaginatedResponseData,
  paginationOptions: Array<number>,
  gridClass?: string,
  isPending: boolean,
  isError: boolean,
  gridOptions: {
    base: number,
    sm: number,
    md: number,
    lg: number,
    xl: number,
    xxl: number
  },
  filterOptions: Array<{
    name: string,
    value: number,
  }>,
}
