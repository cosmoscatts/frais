import { defaultThemeMode } from '~/config'
const THEME_MODE_KEY = EnumStorageKey.themeMode

/**
 * 主题的亮、暗模式
 */
export const isDark = useDark()
export const useToggleDark = useToggle(isDark)

function initDark() {
  if (themeMode === 'auto') {
    const prefersDark = window.matchMedia
                     && window.matchMedia('(prefers-color-scheme: dark)')
                       .matches
    localStorage.setItem(
      THEME_MODE_KEY,
      prefersDark
        ? 'dark'
        : 'light',
    )
  }
  else {
    localStorage.setItem(THEME_MODE_KEY, themeMode)
  }

  return useDark({
    storageKey: THEME_MODE_KEY,
    valueDark: 'dark',
    valueLight: 'light',
  })
}

export const isDark = initDark()
export const toggleDark = useToggle(isDark)
export const preferredDark = usePreferredDark()

/**
 * when the dark changed, we should
 * change the app theme immediately.
 */
watchEffect(() => {
  if (isDark.value) {
    // set dark theme
    document.body.setAttribute('arco-theme', 'dark')
  }
  else {
    // back to light theme
    document.body.removeAttribute('arco-theme')
  }
})
