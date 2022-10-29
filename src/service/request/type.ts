export interface Result<T = any> {
  code: number
  msg: string
  data: T
}

export interface CancelRequestSource {
  [k: string]: () => void
}
