import { request } from '@/service'

export interface LoginData {
  username: string
  password: string
}

export interface LoginRes {
  roleList: string[]
}

export function login(params: any) {
  return request<LoginRes>({
    url: '/api/login',
    method: 'GET',
    params
  })
}
