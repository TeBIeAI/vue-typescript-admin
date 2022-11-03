import { MockMethod } from 'vite-plugin-mock'
import { StatusCode } from './type'
import Mock from 'mockjs'
import asyncRoutes from './routesData'

const users = ['admin', 'user']
const Random = Mock.Random

const token = Random.string('upper', 32, 32)

export function resultSuccess(result, { message = 'ok' } = {}) {
  return Mock.mock({
    code: 200,
    result,
    message,
    type: 'success'
  })
}

const adminInfo = {
  userId: '1',
  username: 'admin',
  realName: 'Admin',
  avatar: Random.image(),
  desc: 'manager',
  password: Random.string('upper', 4, 16),
  token,
  permissions: [
    {
      label: '主控台',
      value: 'dashboard_console'
    },
    {
      label: '监控页',
      value: 'dashboard_monitor'
    },
    {
      label: '工作台',
      value: 'dashboard_workplace'
    },
    {
      label: '基础列表',
      value: 'basic_list'
    },
    {
      label: '基础列表删除',
      value: 'basic_list_delete'
    }
  ]
}

const appMock: MockMethod[] = [
  {
    url: '/api/login',
    method: 'get',
    timeout: 500,
    response: (res) => {
      const { username } = res.query
      const isUser = users.includes(username)

      if (isUser) {
        return {
          code: StatusCode.success,
          msg: '登录成功',
          data: {
            token: username
          }
        }
      } else {
        return {
          code: StatusCode.error,
          msg: '用户名错误'
        }
      }
    }
  },
  {
    url: '/api/user/userinfo',
    method: 'post',
    timeout: 500,
    response: (res) => {
      return resultSuccess(adminInfo)
    }
  }
]

export default appMock
