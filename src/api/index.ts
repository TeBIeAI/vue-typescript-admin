import { request } from '@/service'

export interface LoginData {
  username: string
  password: string
}

export interface LoginRes {
  token: string
}

export function login(params: any) {
  return request<LoginRes>({
    url: '/api/user/login',
    method: 'POST',
    params
  })
}
