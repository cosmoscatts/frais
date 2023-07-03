export function nonNullStr(str?: string | null) {
  return str ?? ''
}

/**
 * 替换 '\' 为 '/'
 */
export function slash(str: string) {
  return str.replace(/\\/g, '/')
}

export function ensurePrefix(prefix: string, str: string) {
  if (!str.startsWith(prefix))
    return prefix + str
  return str
}

export function ensureSuffix(suffix: string, str: string) {
  if (!str.endsWith(suffix))
    return str + suffix
  return str
}

/**
 * 首字母大写
 */
export function capitalize(str: string): string {
  return str[0].toUpperCase() + str.slice(1).toLowerCase()
}
