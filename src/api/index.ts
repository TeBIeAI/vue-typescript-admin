import { request } from '@/service'

export interface LoginData {
  username: string
  password: string
}

// export interface LoginRes {
//   token: ,

// }

export function login(params: any) {
  return request<any>({
    url: '/api/login',
    method: 'GET',
    params
  })
}
