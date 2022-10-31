import { MoackRoutes } from './type'

const routesData: MoackRoutes[] = [
  // {
  //   id: 1,
  //   name: 'userManage',
  //   title: '用户管理',
  //   path: '/views/userManage/index',
  //   pid: 0
  // },
  {
    id: 2,
    name: 'userList',
    title: '列表',
    path: '/views/userManage/list/index',
    pid: 1,
    operation: ['add', 'edit', 'delete']
  }
  // {
  //   id: 3,
  //   name: 'rolesList',
  //   title: '角色',
  //   path: '/views/userManage/roles/index',
  //   pid: 1
  // },
  // {
  //   id: 4,
  //   name: 'cycle',
  //   title: '无限极路由',
  //   path: '/views/cycle/index',
  //   pid: 0
  // },
  // {
  //   id: 5,
  //   name: 'cycle-1',
  //   title: '无限极路由-1',
  //   path: '/views/cycle/index1',
  //   pid: 4
  // },
  // {
  //   id: 6,
  //   name: 'cycle-1',
  //   title: '无限极路由-1',
  //   path: '/views/cycle/index1',
  //   pid: 4
  // },
  // {
  //   id: 7,
  //   name: 'cycle-1-1',
  //   title: '无限极路由-1-1',
  //   path: '/views/cycle/index1-1',
  //   pid: 6
  // },
  // {
  //   id: 8,
  //   name: 'cycle-1-1-1',
  //   title: '无限极路由-1-1-1',
  //   path: '/views/cycle/index1-1-1',
  //   pid: 7
  // }
]

export default routesData
