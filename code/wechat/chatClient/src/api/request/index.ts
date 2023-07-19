import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

import { TIMEOUT } from './config'
import { ResType } from '..'

class AppRequest {
  instance: AxiosInstance

  constructor(baseurl: string, timeout: number) {
    this.instance = axios.create({
      baseURL: baseurl,
      timeout: timeout
    })

    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        const { code, data, msg } = (res.data || {}) as ResType

        if (code !== 0) {
          // 错误提示
          if (msg) {
          }

          throw new Error(msg)
        }

        return data as any
      },
      (err) => {
        return err
      }
    )
  }

  request(config: AxiosRequestConfig) {
    return this.instance.request(config)
  }

  get(config: AxiosRequestConfig) {
    return this.request({ ...config, method: 'get' })
  }

  post(config: AxiosRequestConfig) {
    return this.request({ ...config, method: 'post' })
  }
}

const baseurl = import.meta.env.VITE_APP_BASE_URL

export default new AppRequest(baseurl, TIMEOUT)
