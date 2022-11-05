import { defineStore } from 'pinia'
import { store } from '@/store'
import designSetting from '@/setting/designSetting'

const {
  darkTheme,
  appThemeList,
  appTheme,
  appMenuTheme,
  appMenuActiveTheme,
  appActiveTextColor,
  appMenuTextColor
} = designSetting

interface DesignSettingState {
  darkTheme: boolean
  appThemeList: string[]
  appTheme: string
  appMenuTheme: string
  appMenuActiveTheme: string
  appActiveTextColor: string
  appMenuTextColor: string
}

export const useDesignSettingStore = defineStore({
  id: 'app-design-setting',
  state: (): DesignSettingState => ({
    darkTheme,
    appThemeList,
    appTheme,
    appMenuTheme,
    appMenuActiveTheme,
    appActiveTextColor,
    appMenuTextColor
  }),
  getters: {
    getDarkTheme(): boolean {
      return this.darkTheme
    },
    getAppThemList(): string[] {
      return this.appThemeList
    },
    getAppTheme(): string {
      return this.appTheme
    },
    getAppMenuTheme(): string {
      return this.appMenuTheme
    },
    getAppMenuActiveTheme(): string {
      return this.appMenuActiveTheme
    },
    getActiveTextColor(): string {
      return this.appActiveTextColor
    },
    getMenuText(): string {
      return this.appMenuTextColor
    }
  },
  actions: {
    setDarkTheme(val: boolean): void {
      this.darkTheme = val
    },
    setAppTheme(value: string): void {
      this.appTheme = value
    }
  }
})

export function useDesignSettingStoreWithOut() {
  return useDesignSettingStore(store)
}
