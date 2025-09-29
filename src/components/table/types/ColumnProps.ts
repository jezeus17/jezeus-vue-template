import type { BaseModel } from "@/common/models/base/BaseModel";

export default interface ColumnProps {
  field: string,
  header?: string,
  isBoolean?: boolean,
  isRating?: boolean,
  isActionsColumn?: boolean,
  visibleViewFunction?: (data: BaseModel) => boolean,
  visibleUpdateFunction?: (data: BaseModel) => boolean,
  visibleDeleteFunction?: (data: BaseModel) => boolean,
  fieldGetter?: (data: BaseModel) => unknown,
  filter?: boolean,
  sortable?: boolean,
  customFilterTemplate?: string,
  filterMode?: string,




}
