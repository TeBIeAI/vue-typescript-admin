import { getUserInfo } from '@/api'
import { storage } from '@/utils/storage'
import { defineStore } from 'pinia'
import { ACCESS_TOKEN, CURRENT_USER } from '../mutation-types'

export interface IUserState {
  token: string
  username: string
  welcome: string
  avatar: string
  permissions: any[]
  info: any
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): IUserState => ({
    token: storage.get(ACCESS_TOKEN, ''),
    username: '',
    welcome: '',
    avatar: '',
    permissions: [],
    info: storage.get(CURRENT_USER)
  }),
  getters: {
    getToken(): string {
      return this.token
    },
    getAvatar(): string {
      return this.avatar
    },
    getNickname(): string {
      return this.username
    },
    getPermissions(): [any][] {
      return this.permissions
    },
    getUserInfo(): object {
      return this.info
    }
  },
  actions: {
    setToken(token: string) {
      this.token = token
    },
    setAvatar(avatar: string) {
      this.avatar = avatar
    },
    setPermissions(permissions) {
      this.permissions = permissions
    },
    setUserInfo(info) {
      this.info = info
    },
    async getInfo() {
      const token = 'token'
      const res = (await getUserInfo({ token })).result
      this.setPermissions(res.permissions)
      this.setUserInfo(res)
    },
    // 登出
    async logout() {
      this.setPermissions([])
      this.setUserInfo('')
      storage.remove(ACCESS_TOKEN)
      storage.remove(CURRENT_USER)
      return Promise.resolve('')
    }
  }
})
