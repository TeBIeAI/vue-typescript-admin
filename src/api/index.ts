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

interface UserInfoRes {
  userInfo: any
  asyncRoutes: any[]
}

export function getUserInfo(params: any) {
  return request({
    url: '/api/user/userinfo',
    method: 'post',
    params
  })
}
