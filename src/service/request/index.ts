import axios from 'axios'
import { CancelRequestSource } from './type'
import type {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosError,
  AxiosResponse
} from 'axios'

export default class {
  instance: AxiosInstance
  cancelRequestSourceList: CancelRequestSource[]
  requestUrlList: string[]

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    this.cancelRequestSourceList = []
    this.requestUrlList = []

    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        return res.data
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )
  }

  request = <T>(config: AxiosRequestConfig): Promise<T> => {
    return new Promise((resolve, reject) => {
      const { url } = config
      if (url) {
        this.requestUrlList.push(url)

        config.cancelToken = new axios.CancelToken((fn) => {
          this.cancelRequestSourceList.push({
            [url]: fn
          })
        })
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          resolve(res)
        })
        .catch((err: AxiosError) => {
          reject(err)
        })
        .finally(() => {
          url && this.deleteUrl(url)
        })
    })
  }

  deleteUrl(url: string): void {
    this.requestUrlList = this.requestUrlList.filter((item) => item !== url)
    this.cancelRequestSourceList = this.cancelRequestSourceList.filter(
      (item) => Object.keys(item)[0] !== url
    )
  }

  cancelAllRequest(): void {
    this.requestUrlList = []
    this.cancelRequestSourceList.forEach((c: CancelRequestSource) =>
      c[Object.keys(c)[0]]()
    )
  }
}
