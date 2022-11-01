import { request } from '@/service'

export interface LoginData {
  username: string
  password: string
}

// export interface LoginRes {
//   token: ,

// }

export function login(params: any) {
  return request<any, any>({
    url: '/api/login',
    method: 'GET',
    params
  })
}

interface UserInfoRes {
  userInfo: any
  asyncRoutes: any[]
}

interface IParams {
  token: string
}

export function getUserInfo(params: IParams) {
  return request<IParams, UserInfoRes>({
    url: '/api/user/userinfo',
    method: 'post',
    params
  })
}
