import type { Menu } from '~/types'

/**
 * 判断是否有页面的权限
 */
export function hasPermissionOfThePage(menus: Menu[], toPath: string) {
  if (toPath === '/')
    return true
  let exist = false
  while (menus.length && !exist) {
    const element = menus.shift()
    if (element?.path === toPath)
      exist = true

    if (element?.children) {
      menus.push(
        ...(element.children as unknown as Menu[]),
      )
    }
  }
  return exist
}

/**
 * 路由执行策略
 */
export function executeActions(actions: [boolean, Function][]) {
  actions.some((item) => {
    const [flag, action] = item
    if (flag)
      action()

    return flag
  })
}
