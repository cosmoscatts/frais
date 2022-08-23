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
