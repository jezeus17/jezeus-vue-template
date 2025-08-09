import { isAxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import HttpError from '../exceptions/HttpError'
import { axiosInstance } from './axios.config'
import TokenHandler from '@/common/utils/token-handler'

export const sendRequest = async (options: {
  url: string
  method?: 'GET' | 'POST' | 'DELETE' | 'PATCH'
  requiresAuth?: boolean
  body?: Record<string, unknown>
  mode?: 'form-data' | 'application/json' | 'blob' | 'text'
  onSuccessFunction?: () => void,
  token?: string
}) => {
  try {

    const {
      url,
      method = 'GET',
      requiresAuth = true,
      body = {},
      mode = "application/json",
      token = TokenHandler.getToken()
    } = options
    console.log(mode)
    const axiosConfig: AxiosRequestConfig = {
      url: `${import.meta.env.VITE_API_PATH}/${url}`,
      method: method,
      headers:
        requiresAuth && token !== null
          ? {
            Authorization: `Bearer ${token}`,
            'Content-Type': mode,
            Accept: '*/*'
          }
          : {}
    }
    if (method === 'GET')
      axiosConfig.params = body
    else axiosConfig.data = body
    const res: AxiosResponse = await axiosInstance.request(axiosConfig)
    if (res) {
      if (res.status === 200 || res.status === 201) {
        if (res.data.status == 400) {
          console.log(res.data.response)
          throw new HttpError(res.data.message,
            400, [], res.data.response.data)
        }
        console.log(res)
        return res.data
      }
    } else throw new HttpError('Servidor no responde', 500)

  } catch (err) {

    console.log(err.validations)
    if (isAxiosError(err)) throw new HttpError(err.message, err.status ?? 500)
    if (err instanceof HttpError) throw new HttpError(err.message, err.statusCode, err.validations, err.data)
    else throw new Error('Error del servidor')
  }
}
