import { MockMethod } from 'vite-plugin-mock'

const appMock: MockMethod[] = [
  {
    url: '/api/login',
    method: 'get',
    timeout: 800,
    response: () => {
      return {
        code: 200,
        msg: 'OK',
        data: {
          roleList: [
            '/dashboard',
            '/dashboard/dashboard-index',
            '/dashboard/dashboard-index/dashboard-index1'
          ]
        }
      }
    }
  }
]

export default appMock
