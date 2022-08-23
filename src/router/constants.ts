export const BASE_LAYOUT = () => import('~/layouts/BaseLayout.vue')
export const BLANK_LAYOUT = () => import('~/layouts/BlankLayout.vue')

/**
 * 路由白名单
 */
export const WHITE_LIST = [
  'NotFound',
  'ErrorPage',
  'Login',
  'Redirect',
  'Profile',
]

export const NOT_FOUND = {
  name: 'NotFound',
}

export const ERROR_PAGE = {
  name: 'ErrorPage',
}
