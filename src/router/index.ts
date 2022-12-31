import { createRouter, createWebHashHistory } from 'vue-router'
import { BASE_LAYOUT, BLANK_LAYOUT } from './constants'
import routes from './format-routes'
import createRouterGuard from './guards'

const router = createRouter({
  history: createWebHashHistory('/'),
  routes: [
    {
      path: '/',
      component: BASE_LAYOUT,
      meta: {
        requiresAuth: true,
      },
    },
    ...routes,
    {
      path: '/:pathMatch(.*)*',
      component: BLANK_LAYOUT,
      children: [
        {
          path: '',
          name: 'NotFound',
          component: () => import('~/pages/exception/404/index.vue'),
        },
      ],
    },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

export default router
export { createRouterGuard }
export * from './constants'
