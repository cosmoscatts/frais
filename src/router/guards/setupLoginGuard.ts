import type { Router } from 'vue-router'

export default function setupLoginGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // `message` & `Loading Bar`
    const { message, loadingBar } = useGlobalNaiveApi()

    // 获取菜单
    const permissionStore = usePermissionStore()
    permissionStore.fetchAppMenus()
    next()

    if (!to.path.startsWith('/redirect'))
      loadingBar.start()
    const { user } = useUserStore()
    if (user) {
      if (user.roleId) {
        next()
      }
      else {
        useLogout()
        message.error('请联系管理员配置用户角色')
        next('/login')
      }
    }
    else {
      if (to.name === 'Login')
        next()

      else
        next('/login')
    }
  })
}
