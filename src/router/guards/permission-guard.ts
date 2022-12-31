import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { LOGIN, NO_PERMISSION, WHITE_LIST } from '~/router/constants'
import { Token, checkRoutePermission, findFirstRouteInPermission } from '~/utils'

export default function createPermissionGuard(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const authStore = useAuthStore()
  const hasLogin = authStore.hasLogin && !!Token.get()
  const needLogin = Boolean(to.meta?.requiresAuth) && !WHITE_LIST.includes(to.name as string)
  // 需要克隆 menus, checkRoutePermission 会操作传递的数组对象
  const hasPermission = checkRoutePermission(G.clone(authStore.menus), to)

  const fns: [boolean, Function][] = [
    // 已登录状态跳转登录页，跳转至【多页签最后一项】|【菜单第一项】
    [hasLogin && to.name === LOGIN.name, () => next(findFirstRouteInPermission())],
    // 不需要登录权限的页面直接通行
    [!needLogin, next],
    // 未登录状态进入需要登录权限的页面
    [!hasLogin && needLogin, () => {
      if (to.path !== '/') {
        $message.error('请登录')
        $loadingBar.error()
      }
      next(LOGIN)
    }],
    // 登录状态进入需要登录权限的页面，有权限直接通行
    [hasLogin && needLogin && hasPermission, next],
    // 登录状态进入需要登录权限的页面，无权限，重定向到无权限页面
    [hasLogin && needLogin && !hasPermission, () => {
      $message.error('没有权限哦，请联系管理员')
      $loadingBar.error()
      next(NO_PERMISSION)
    }],
  ]
  Conditional.some(fns)
}
