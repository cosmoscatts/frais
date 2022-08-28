import type { Router } from 'vue-router'
import createPermissionGuard from './createPermissionGuard'

export default function createRouterGuard(router: Router) {
  // `Loading Bar`
  const { loadingBar } = useGlobalNaiveApi()
  router.beforeEach(async (to, from, next) => {
    // 开始 loadingBar
    loadingBar.start()
    // 页面跳转权限处理
    await createPermissionGuard(to, from, next)
  })

  router.afterEach(() => {
    // 结束 loadingBar
    loadingBar.finish()
  })
}
