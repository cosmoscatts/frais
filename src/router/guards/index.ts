import type { Router } from 'vue-router'
import createPermissionGuard from './permission'
import { APP_META } from '~/constants'

export default function createRouterGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    window.$loadingBar?.start()
    createPermissionGuard(to, from, next)
  })
  router.afterEach((to) => {
    useTitle(to.meta?.title as string ?? APP_META.name)
    window.$loadingBar?.finish()
  })
}
