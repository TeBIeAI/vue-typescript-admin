import AxiosInstance from './request'
import { AxiosRequestConfig } from 'axios'
import { Result } from './request/type'

const instance = new AxiosInstance({
  baseURL: import.meta.env.BASE_URL,
  timeout: 50000
})

export const request = <R, T>(config: AxiosRequestConfig<R>) => {
  const { method = 'GET', params } = config
  config[method == 'GET' ? 'params' : 'data'] = params
  return instance.request<Result<T>>(config)
}
