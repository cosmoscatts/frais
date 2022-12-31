import { breakpointsTailwind } from '@vueuse/core'
import type { GlobalThemeOverrides } from 'naive-ui'
import {
  createPrimaryColor,
  createThemeMode,
  writeColors2Body,
} from '~/utils'
import { APP_SETTINGS } from '~/config'

// ----- Theme -----

export const isDark = createThemeMode(APP_SETTINGS.defaultThemeMode)
export const toggleDark = useToggle(isDark)
export const themeOverrides = ref<GlobalThemeOverrides>()
export function createUi() {
  const uiStore = useUiStore()
  // 根据主题主色调配置，生成颜色
  const overrides = createPrimaryColor(uiStore.settings.primaryColor)
  themeOverrides.value = {
    common: { ...overrides },
    LoadingBar: { colorLoading: uiStore.settings.primaryColor },
  }
  writeColors2Body(overrides, isDark.value)
}
watch(isDark, createUi)

// ----- 响应式 -----

export const breakpoints = useBreakpoints(breakpointsTailwind)
export const isMobile = breakpoints.smaller('sm')
export const isPC = breakpoints.greaterOrEqual('sm')
export const labelHidden = breakpoints.smaller('md') // 隐藏 [form label]
