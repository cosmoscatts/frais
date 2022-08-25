import { defaultThemeMode } from '~/config'
import { wrapStorageKey } from '~/utils'
import { appStorageKeyEnum } from '~/enum'

const THEME_MODE_KEY = wrapStorageKey(appStorageKeyEnum.themeMode)

/**
 * 初始化主题的亮、暗模式
 */
function initThemeMode() {
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

  return useDark({
    storageKey: THEME_MODE_KEY,
    valueDark: 'dark',
    valueLight: 'light',
  })
}

export const isDark = initThemeMode()
export const useToggleDark = useToggle(isDark)

