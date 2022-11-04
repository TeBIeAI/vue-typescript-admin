import { defineStore } from 'pinia'
import { store } from '@/store'
import designSetting from '@/setting/designSetting'

const { darkTheme, darkThemeConfig } = designSetting

interface DesignSettingState {
  darkTheme: boolean
}

const useDesignSettingStore = defineStore({
  id: 'app-design-setting',
  state: (): DesignSettingState => ({
    darkTheme
  }),
  getters: {
    getDarkTheme(): boolean {
      return this.darkTheme
    }
  },
  actions: {
    setDarkTheme(val: boolean): void {
      this.darkTheme = val
    }
  }
})

export function useDesignSettingStoreWithOut() {
  return useDesignSettingStore(store)
}
