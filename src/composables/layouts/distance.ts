import { LAYOUT_PARAMS as params } from '~/constants'

export function getLayoutContentHeightSubtraction() {
  const uiStore = useUiStore()
  return computed(() => {
    let height = params.navHeight
    if (uiStore.settings.showTabs)
      height += params.tabHeight
    return height
  })
}

/**
 * 获取内容区左边距离
 */
export function getLayoutContentLeftDistance() {
  const uiStore = useUiStore()
  return computed(() => {
    const layout = uiStore.settings.layout
    if (layout === 'horizontal')
      return 0
    if (['vertical', 'horizontal-mix'].includes(layout))
      return `${[params.sideWidth, params.sideCollapsedWidth][Number(uiStore.collapseSide.state)]}px`
    let width = [params.mixSideWidth, params.mixSideCollapsedWidth][Number(uiStore.collapseSide.state)]
    if (uiStore.mixSideFixed)
      width += params.mixSideDrawerWidth
    return `${width}px`
  })
}
