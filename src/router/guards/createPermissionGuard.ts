import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { executeActions, findFirstPermissionRoute, hasPermissionOfThePage } from './helper'
import { NO_PERMISSION, WHITE_LIST } from '~/router/constants'

export default async function createPermissionGuard(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  // `message` & `Loading Bar`
  const { message, loadingBar } = useGlobalNaiveApi()

  const tabStore = useTabStore()
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()

  const menus = permissionStore.appMenus
  const isLogin = !!userStore.user
  const needLogin = Boolean(to.meta?.requiresAuth) && !WHITE_LIST.includes(to.name as string)
  const hasPermission = hasPermissionOfThePage(menus, to.path)

  const actions: [boolean, Function][] = [
    // 已登录状态跳转登录页，跳转至首页
    [
      isLogin && to.name === 'Login',
      () => {
        const path = findFirstPermissionRoute() as string
        next({ path })
      },
    ],
    // 不需要登录权限的页面直接通行
    [
      !needLogin,
      () => {
        next()
      },
    ],
    // 未登录状态进入需要登录权限的页面
    [
      !isLogin && needLogin,
      () => {
        next('/login')
        message.error('请登录')
        loadingBar.error()
      },
    ],
    // 登录状态进入需要登录权限的页面，有权限直接通行
    [
      isLogin && needLogin && hasPermission,
      async () => {
        // 从登录页跳转，需要查询菜单
        if (to.path === '/') {
          await permissionStore.fetchAppMenus()
          tabStore.initTabs(userStore.user!.id)
          const path = findFirstPermissionRoute() as string
          next({ path })
        }
        else {
          next()
        }
      },
    ],
    [
      // 登录状态进入需要登录权限的页面，无权限，重定向到无权限页面
      isLogin && needLogin && !hasPermission,
      () => {
        next(NO_PERMISSION)
        message.error('没有权限哦，请联系管理员')
        loadingBar.error()
      },
    ],
  ]

  executeActions(actions)
}
