import AxiosInstance from './request'
import { AxiosRequestConfig } from 'axios'

const instance = new AxiosInstance({
  baseURL: import.meta.env.BASE_URL,
  timeout: 50000
})

export const request = <T>(config: AxiosRequestConfig) => {
  const { method = 'GET', params } = config
  config[method == 'GET' ? 'params' : 'data'] = params
  return instance.request<T>(config)
}
