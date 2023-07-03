export default {
  path: '/dashboard',
  name: 'Dashboard',
  component: () => import('~/pages/dashboard/index.vue'),
  meta: {
    title: '首页',
    requiresAuth: true,
    cached: true,
    layout: 'default',
  },
}
