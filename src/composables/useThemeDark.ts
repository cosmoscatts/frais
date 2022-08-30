import { defaultThemeMode } from '~/config'
import { wrapStorageKey } from '~/utils'
import { appStorageKeyEnum } from '~/enum'

const THEME_MODE_KEY = wrapStorageKey(appStorageKeyEnum.themeMode)

/**
 * 初始化主题的亮、暗模式
 * 模式为 `auto` 则需要判断当前系统的模式
 */
function initThemeDarkMode() {
  // 只有第一次会初始化 `localStorage`
  if (!localStorage.getItem(THEME_MODE_KEY)) {
    if (defaultThemeMode === 'auto') {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      localStorage.setItem(
        THEME_MODE_KEY,
        prefersDark
          ? 'dark'
          : 'light',
      )
    }
    else {
      localStorage.setItem(THEME_MODE_KEY, defaultThemeMode)
    }
  }
  
  return useDark({
    storageKey: THEME_MODE_KEY,
    valueDark: 'dark',
    valueLight: 'light',
  })
}

export const isDark = initThemeDarkMode()
export const useToggleDark = useToggle(isDark)

