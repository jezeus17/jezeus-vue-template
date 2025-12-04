import type { BaseModel } from "@/common/models/base/BaseModel";
import type { PaginatedResponseData, ResponseData } from "@/common/types/ResponseData";

export interface TableProps<T extends BaseModel = BaseModel> {
  title?: string;
  dialogsHeader?: string;
  model: T;
  hasExpander?: boolean;
  paginate?: boolean;
  customAddFunction?: () => void;
  customUpdateFunction?: () => void;
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
  hideChangeMode?: boolean;
  showTotalCard?: boolean;
  internDatatable?: boolean;
  gridClass?: string,
  createFormComponent: unknown;
  updateFormComponent: unknown;
  detailsComponent: unknown
}
interface QueryOptions {
  limit?: number;
  offset?: number;
  where?: unknown;
  relations: unknown[]
}

export interface ExtraOption {
  renderIf: (data: object) => boolean;
  tooltip: string;
  severity: string;
  icon: string;
  action: (data: BaseModel, event: MouseEvent) => void;
}

