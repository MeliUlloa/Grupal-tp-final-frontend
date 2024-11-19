import type { Theme } from '@/models/ThemeModel'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore({
  id: 'theme',
  state: (): Theme => ({
    darkMode: false,
    text: 'LightMode',
  }),
  actions: {
    changeTheme() {
      this.darkMode = !this.darkMode
      this.text = this.darkMode ? 'DarkMode' : 'LightMode'
    },
  },
})