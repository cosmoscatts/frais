import { breakpointsTailwind } from '@vueuse/core'

export const breakpoints = useBreakpoints(breakpointsTailwind)

export const isMobile = breakpoints.smaller('sm')
export const isPC = breakpoints.greaterOrEqual('sm')

export const labelHidden = breakpoints.smaller('md') // 隐藏 [form label]

export const isSmallScreen = breakpoints.greaterOrEqual('sm')
export const isMediumScreen = breakpoints.greaterOrEqual('md')
export const isExtraLargeScreen = breakpoints.greaterOrEqual('xl')
