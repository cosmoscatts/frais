import type { Router } from 'vue-router'
import createPermissionGuard from './permission-guard'
import { APP_META } from '~/config'

export default function createRouterGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    $loadingBar.start()
    createPermissionGuard(to, from, next)
  })
  router.afterEach((to) => {
    useTitle(to.meta?.title as string ?? APP_META.name)
    $loadingBar.finish()
  })
}
