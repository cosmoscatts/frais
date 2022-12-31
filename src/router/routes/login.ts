import { BLANK_LAYOUT } from '../constants'

export default {
  path: '/login',
  component: BLANK_LAYOUT,
  children: [
    {
      path: '',
      name: 'Login',
      component: () => import('~/pages/login/index.vue'),
      meta: {
        requiresAuth: false,
      },
    },
  ],
}
