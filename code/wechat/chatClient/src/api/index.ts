import appRequest from './request'

export type ResType = {
  code: number
  data?: ResDataType
  msg?: string
}

export type ResDataType = {
  [key: string]: any
}

export default appRequest
