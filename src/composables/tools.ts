import type { ConfigProviderProps } from 'naive-ui'
import {
  createDiscreteApi,
  darkTheme,
  lightTheme,
} from 'naive-ui'

export { G, Conditional, BaseRequest, R } from '~/utils'

export const isDevelopment = import.meta.env.MODE === 'development'

/**
 * 格式化时间
 * @param date Date | number | string
 * @param partten
 */
export function formatDate(
  date: Date | number | string | undefined = new Date(),
  partten = 'YYYY-MM-DD HH:mm:ss',
): string {
  if (['number', 'string'].includes(typeof date)) date = new Date(date)
  return dayjs(date).format(partten)
}

// ----- Naive Ui Global API -----

const configProviderProps = computed<ConfigProviderProps>(() => {
  return {
    theme: isDark.value
      ? darkTheme
      : lightTheme,
    themeOverrides: themeOverrides.value,
  }
})
export const $discrete_api = createDiscreteApi(
  ['message', 'dialog', 'notification', 'loadingBar'],
  { configProviderProps },
)
export const $dialog = $discrete_api.dialog
export const $message = $discrete_api.message
export const $notification = $discrete_api.notification
export const $loadingBar = $discrete_api.loadingBar

// ----- Open Window -----

type TargetContext = '_self' | '_parent' | '_blank' | '_top'

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

// ----- Confirm 确认框 -----

export function useConfirm(content: string, onPositiveClick: (e: MouseEvent) => unknown) {
  $dialog.warning({
    title: '警告',
    content,
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick,
  })
}
