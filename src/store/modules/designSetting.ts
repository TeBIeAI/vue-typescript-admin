import { defineStore } from 'pinia'
import { store } from '@/store'
import designSetting from '@/setting/designSetting'

const { darkTheme, appThemeList, appTheme } = designSetting

interface DesignSettingState {
  darkTheme: boolean
  appThemeList: string[]
  appTheme: string
}

const useDesignSettingStore = defineStore({
  id: 'app-design-setting',
  state: (): DesignSettingState => ({
    darkTheme,
    appThemeList,
    appTheme
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
