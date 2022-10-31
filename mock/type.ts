type UserOperation = 'add' | 'edit' | 'delete'

export enum StatusCode {
  success = 200,
  error = -1
}

export interface MoackRoutes {
  id: number
  name: string
  title: string
  path: string
  pid: number
  operation?: UserOperation[]
}
