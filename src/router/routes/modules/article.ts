import { BASE_LAYOUT } from '~/router/constants'

/**
 * `markdown` 示例路由
 */
export default {
  path: '/markdown',
  component: BASE_LAYOUT,
  children: [
    {
      path: '',
      name: 'Markdown',
      component: () => import('~/pages/markdown/index.vue'),
      meta: {
        title: 'Markdown 示例',
        requiresAuth: true,
        cached: false,
      },
    },
  ],
}
