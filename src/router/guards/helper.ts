import type { Menu } from '~/types'

/**
 * 如果开启多页签缓存，则找缓存的最后一个多页签
 * 否则找到登录用户的所拥有菜单第一项
 */
export function findFirstPermissionRoute() {
  const { baseSettings: { showTabs, cacheTabs } } = useAppStore()
  const { visitedTabs } = useTabStore()
  if (showTabs && cacheTabs && visitedTabs?.length > 0)
    return visitedTabs[visitedTabs.length - 1].path

  const { appMenus } = usePermissionStore()
  const menus = [...appMenus]
  let path = null
  while (menus.length && !path) {
    const item = menus.shift() as Menu
    if (item.path)
      path = item.path

    if (item?.children?.length)
      menus.unshift(...item.children)
  }

  return path
}

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
