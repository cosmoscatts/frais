import type { Router } from 'vue-router'
import NProgress from 'nprogress'

export default function setupLoginGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    next()
  })
}
