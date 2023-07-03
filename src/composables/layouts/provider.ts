import { LAYOUT_PARAMS as params } from '~/constants'

export function getFullWrapperRect() {
  const uiStore = useUiStore()
  const width = computed(() => {
    if (isMobile.value || uiStore.settings.layout.includes('horizontal'))
      return '100%'
    if (uiStore.settings.layout === 'vertical-mix') {
      let width = uiStore.collapseSide.state ? params.mixSideCollapsedWidth : params.mixSideWidth
      if (uiStore.mixSideFixed)
        width += params.mixSideDrawerWidth
      return `calc(100% - ${width}px)`
    }
    return `calc(100% - ${uiStore.collapseSide.state ? params.sideCollapsedWidth : params.sideWidth}px)`
  })
  const left = computed(() => {
    if (isMobile.value || uiStore.settings.layout.includes('horizontal'))
      return '0px'
    if (uiStore.settings.layout === 'vertical-mix') {
      let width = uiStore.collapseSide.state ? params.mixSideCollapsedWidth : params.mixSideWidth
      if (uiStore.mixSideFixed)
        width += params.mixSideDrawerWidth
      return `${width}px`
    }
    return `${uiStore.collapseSide.state ? params.sideCollapsedWidth : params.sideWidth}px`
  })
  return {
    width,
    left,
  }
}

export function getContentWrapperMarginLeft() {
  const uiStore = useUiStore()
  return computed(() => {
    if (isMobile.value || uiStore.settings.layout !== 'horizontal-mix')
      return '0px'
    return [`${params.sideWidth}px`, `${params.sideCollapsedWidth}px`][Number(uiStore.collapseSide.state)]
  })
}

export function getContentWrapperStyle() {
  const uiStore = useUiStore()
  return computed(() => {
    const subtraction = getLayoutContentHeightSubtraction().value
    const contentWrapperMarginLeft = getContentWrapperMarginLeft().value
    return {
      marginTop: `${
        !uiStore.settings.fixNav
          ? 0
          : uiStore.settings.showTabs
            ? params.navHeight + params.tabHeight
            : params.navHeight
      }px`,
      marginLeft: `${contentWrapperMarginLeft}`,
      minHeight: `calc(100% - ${subtraction}px)`,
      overflow: uiStore.settings.fixNav
        ? 'hidden auto'
        : undefined,
    }
  })
}
