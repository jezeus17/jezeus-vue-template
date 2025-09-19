import type { PaginatedResponseData, ResponseData } from "@/common/types/ResponseData";

export default interface TableHeaderProps {
  refetch: () => Promise<unknown>,
  data: ResponseData | PaginatedResponseData,
  isPending: boolean,
}
