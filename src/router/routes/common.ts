export default [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('~/pages/login/index.vue'),
    meta: {
      title: '登录',
      requiresAuth: false,
      cached: false,
      layout: 'blank',
      isWhite: true,
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('~/pages/profile/index.vue'),
    meta: {
      title: '个人资料',
      requiresAuth: true,
      cached: false,
      layout: 'default',
      isWhite: true,
    },
  },
  {
    path: '/redirect/:path(.*)',
    name: 'Redirect',
    component: () => import('~/pages/Redirect.vue'),
    meta: {
      requiresAuth: true,
      cached: false,
      layout: 'blank',
      isWhite: true,
    },
  },
  {
    path: '/403',
    name: 'NoPermission',
    component: () => import('~/pages/exception/403.vue'),
    meta: {
      title: '403',
      requiresAuth: false,
      cached: false,
      layout: 'blank',
      isWhite: true,
    },
  },
  {
    path: '/500',
    name: 'ErrorPage',
    component: () => import('~/pages/exception/500.vue'),
    meta: {
      title: '500',
      requiresAuth: false,
      cached: false,
      layout: 'blank',
      isWhite: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('~/pages/exception/404.vue'),
    meta: {
      title: '404',
      requiresAuth: false,
      cached: false,
      layout: 'blank',
      isWhite: true,
    },
  },
]
