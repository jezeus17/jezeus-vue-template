export default class HttpError extends Error {
  statusCode: number
  validations: { record: number, field: string, type: string }[]
  data: string

  constructor(message: string, statusCode: number, validations?: { record: number, field: string, type: string }[], data?: string) {
    super(message)
    this.name = 'HttpError'
    this.statusCode = statusCode
    this.validations = validations ?? []
    this.data = data ?? ''
  }
}
