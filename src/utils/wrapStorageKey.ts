import { APP_META } from '~/config'

/**
 * 包装 `Storage Key`, 拼接项目名称
 */
export function wrapStorageKey(key: string) {
  const { name } = APP_META
  return `${name.toUpperCase()}-${key}`
}
