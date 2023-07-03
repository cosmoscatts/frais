<script setup lang="ts">
import { LAYOUT_PARAMS as params } from '~/constants'

const uiStore = useUiStore()
const getTabsWidth = computed(() => {
  if (isMobile.value)
    return '100%'
  return `calc(100% - ${[params.sideWidth, params.sideCollapsedWidth][Number(uiStore.collapseSide.state)]}px)`
})
const getTabsLeft = computed(() => {
  if (isMobile.value)
    return 0
  return [params.sideWidth, params.sideCollapsedWidth][Number(uiStore.collapseSide.state)]
})
</script>

<template>
  <LayoutProvider>
    <template #sider>
      <LayoutSider
        v-if="isPC"
        v-bind="{ showLogo: false }" absolute left-0 z-10
        :style="{
          top: `${params.navHeight}px`,
        }"
      />
    </template>
    <template #header>
      <LayoutNav absolute left-0 top-0 w-full :style="{ height: `${params.navHeight}px` }" />
      <LayoutTabs
        v-show="uiStore.settings.showTabs" absolute left-0 top-0 w-full
        :style="{
          width: `${getTabsWidth}`,
          height: `${params.tabHeight}px`,
          top: `${params.navHeight}px`,
          left: `${getTabsLeft}px`,
        }"
      />
    </template>
  </LayoutProvider>
</template>
