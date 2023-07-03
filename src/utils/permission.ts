import type { RouteLocationNormalized } from 'vue-router'

/**
 * 找到所有权限的路由路径
 */
export function getRoutesInPermission(): string[] {
  return [...getUserFlattenMenuTree()
    .map(item => item.path)
    .filter(notNullish), '/profile']
}

/**
 * 判断用户是否有目标页面的权限
 */
export function checkRoutePermission(route: RouteLocationNormalized): boolean {
  const authStore = useAuthStore()
  if (!authStore.hasLogin || !authStore.menus.length || !route.path)
    return false
  if (route.meta.isWhite)
    return true

  const ownPaths = getRoutesInPermission()
  return ownPaths.includes(route.path)
}

/**
 * 找到登录后跳转的路由
 */
export function getToRouteAfterLogin() {
  const uiStore = useUiStore()
  const tabStore = useTabStore()
  const ownPaths = getRoutesInPermission()
  if (!tabStore.tabs.length)
    tabStore.createTabs()
  const tabs = tabStore.tabs
  if (uiStore.settings.showTabs && uiStore.settings.cacheTabs && tabs.length)
    return tabs[tabs.length - 1].path

  if (!ownPaths.length)
    return null
  return ownPaths[0]
}
