export interface ResponseData {
  data: unknown[]
}
export interface PaginatedResponseData extends ResponseData {
  elements_amount: number,
  actual_page: number,
  pages: number,
}
