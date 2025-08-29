import type { BaseModel } from "@/common/models/BaseModel";
import type { PaginatedResponseData, ResponseData } from "@/common/types/ResponseData";

export default interface TableProps {
  title?: string;
  dialogsHeader?: string;
  model: BaseModel;
  hasExpander?: boolean;
  paginate?: boolean;
  customAddFunction?: (data: unknown) => void;
  customUpdateFunction?: (data: unknown) => void;
  customGetAllFunction?: (data: unknown) => Promise<ResponseData | PaginatedResponseData>;
  customGetOneFunction?: (id: string | number) => Promise<object>;
  queryOptions?: QueryOptions;
  extraOptions?: ExtraOption[];
  isFormDataLoading?: boolean;
  hideActions?: boolean;
  hideViewButton?: boolean;
  hideUpdateButton?: boolean;
  hideCreateButton?: boolean;
  hideDeleteButton?: boolean;
  internDatatable?: boolean;
}
interface QueryOptions {
  limit?: number;
  offset?: number;
  where?: unknown;
  relations: unknown[]
}

interface ExtraOption {
  renderIf: (data: object) => boolean;
  tooltip: string;
  severity: string;
  icon: string;
  action: (data: BaseModel, event: MouseEvent) => void;
}

