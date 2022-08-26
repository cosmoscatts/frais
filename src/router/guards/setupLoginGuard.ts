import type { Router } from 'vue-router'

export default function setupLoginGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const permissionStore = usePermissionStore()
    permissionStore.fetchAppMenus()
    next()
  })
}
