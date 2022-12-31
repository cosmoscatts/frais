import type { ConfigProviderProps } from 'naive-ui'
import {
  createDiscreteApi,
  darkTheme,
  lightTheme,
} from 'naive-ui'

export function useGlobalNaiveApi() {
  const appStore = useAppStore()

  const configProviderProps = computed<ConfigProviderProps>(() => {
    const { themeOverrides } = appStore
    return {
      theme: isDark.value
        ? darkTheme
        : lightTheme,
      themeOverrides,
    }
  })

  const {
    dialog,
    message,
    notification,
    loadingBar,
  } = createDiscreteApi(
    ['message', 'dialog', 'notification', 'loadingBar'],
    { configProviderProps },
  )

  return {
    dialog,
    message,
    notification,
    loadingBar,
  }
}

type TargetContext = '_self' | '_parent' | '_blank' | '_top'

/**
 * 封装打开窗口的通用方法
 * @param url
 * @param opts
 */
export function useOpenWindow(
  url: string,
  opts?: {
    target?: TargetContext
    [key: string]: any
  },
) {
  const { target = '_blank', ...others } = opts || {}
  window.open(
    url,
    target,
    Object.entries(others)
      .reduce((preValue: string[], curValue) => {
        const [key, value] = curValue
        return [...preValue, `${key}=${value}`]
      }, [])
      .join(','),
  )
}

/**
 * 退出登录时，清楚 `store` 中的内容
 */
export function useLogout() {
  const { removeUser } = useUserStore()
  const { removeAllTabs } = useTabStore()
  const { removeAppMenus } = usePermissionStore()
  const actions = [removeUser, removeAllTabs, removeAppMenus]

  actions.forEach((removeEffect) => {
    removeEffect()
  })
}
