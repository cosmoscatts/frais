import type { SelectOption } from 'naive-ui'

export function registerRoleOptions(): Promise<SelectOption[]> {
  return new Promise((resolve) => {
    resolve(Array.from({ length: 10 }, (_, idx) => {
      return {
        value: idx + 1,
        label: ensurePrefix('角色', String(idx + 1)),
      }
    }))
  })
}
