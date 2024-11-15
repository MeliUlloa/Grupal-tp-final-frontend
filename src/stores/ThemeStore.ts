import { defineStore } from "pinia";
import type { ThemeState } from "@/models/ThemeModel";

export const useThemeStore = defineStore({
    id: 'theme',
    state: ():  ThemeState => ({
        isDark: false,
        mode: 'Light Mode'
    }),
    actions: {
        toggleTheme() {
            this.isDark = !this.isDark
            this.mode = this.isDark ? 'Dark Mode' : 'Light Mode'
        }
    }
    
}) 