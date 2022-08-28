import { BaseLayout, BlankLayout } from '~/layouts'

export const BASE_LAYOUT = BaseLayout
export const BLANK_LAYOUT = BlankLayout

/**
 * 路由白名单
 */
export const WHITE_LIST = [
  'NoPermission',
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

export const NO_PERMISSION = {
  name: 'NoPermission',
}
