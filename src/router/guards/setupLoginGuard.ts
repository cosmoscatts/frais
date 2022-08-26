import type { Router } from 'vue-router'

export default function setupLoginGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // `Loading Bar`
    const { loadingBar } = useGlobalNaiveApi()
    loadingBar.start()
    useTimeoutFn(() => loadingBar.finish(), 1000)

    // 获取菜单
    const permissionStore = usePermissionStore()
    permissionStore.fetchAppMenus()
    next()
  })
}
