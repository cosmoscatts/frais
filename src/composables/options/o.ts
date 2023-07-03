import type { AxiosResponse } from 'axios'
import type { SelectOption } from 'naive-ui'

type Key = keyof typeof keyPropertyMap

const keyPropertyMap = {
  role: registerRoleOptions,
}

/**
 * 配置下拉框 api 前缀，用于检测是否需要更新下拉框数据
 */
const keyUrlPrefixMap = {

} as unknown as Record<string, string>

const optionsMap = new Map<Key, SelectOption[]>()

export class O {
  static keys = Object.keys(keyPropertyMap) as Key[]

  static promiseMap = (() => {
    const map = new Map<Key, Ref<SelectOption[]>>()
    O.keys.forEach((key) => {
      map.set(key, computedAsync(async () => {
        const options = await (keyPropertyMap[key] as () => Promise<SelectOption[]>)()
        if (options.length)
          optionsMap.set(key, options)
        return options
      }, [], { lazy: true }))
    })
    return map
  })()

  static options(key: Key) {
    if (optionsMap.has(key))
      return optionsMap.get(key) || []

    return O.promiseMap.get(key)!.value
  }

  static label(key: Key, value: string | number, defaultReturn = '') {
    const _options = O.options(key)
    if (!_options.length)
      return defaultReturn

    return _options.find(i => i.value === value)?.label as string ?? defaultReturn
  }

  static update({ config }: AxiosResponse) {
    const { url, method } = config
    if (!url?.length || !['put', 'post', 'delete'].includes(nonNullStr(method)))
      return

    const urlPrefixValues = Object.values(keyUrlPrefixMap)
    urlPrefixValues.forEach((val) => {
      if (url.startsWith(val) || url.includes(val)) {
        const key = Object.entries(keyUrlPrefixMap).find(([_key, value]) => value === val)?.[0] as Key | undefined
        if (key) {
          optionsMap.delete(key)
          O.options(key)
        }
      }
    })
  }
}
