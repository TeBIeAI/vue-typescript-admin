import { MockMethod } from 'vite-plugin-mock'
import { StatusCode } from './type'

const users = ['admin', 'user']

const appMock: MockMethod[] = [
  {
    url: '/api/login',
    method: 'get',
    timeout: 500,
    response: (res) => {
      console.log(1)

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
  }
]

export default appMock
