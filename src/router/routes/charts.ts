import { BASE_LAYOUT } from '~/router/constants'

/**
 * charts 示例路由
 */
export default {
  path: '/charts',
  component: BASE_LAYOUT,
  children: [
    {
      path: '',
      name: 'Charts',
      component: () => import('~/pages/charts/index.vue'),
      meta: {
        title: 'Charts 示例',
        requiresAuth: true,
        cached: false,
      },
    },
  ],
}
