<script setup lang="ts">
import { LAYOUT_PARAMS as params } from '~/constants'

const uiStore = useUiStore()
const isHorizontal = computed(() => uiStore.settings.layout === 'horizontal')
const isHorizontalOrMix = computed(() => uiStore.settings.layout.includes('horizontal'))
const showPageHeader = computed(() => {
  const t = uiStore.settings.layout.includes('vertical') || uiStore.settings.layout === 'horizontal-mix'
  return uiStore.settings.showPageHeader && t && isPC.value
})
const logoWidth = computed(() => isPC.value
  ? params.sideWidth
  : params.sideCollapsedWidth,
)
</script>

<template>
  <div flex-center border-b-1px pr5 base-border bg-body>
    <LayoutLogo v-if="isHorizontalOrMix || isMobile" :style="{ width: `${logoWidth}px` }" />
    <LayoutMenu v-if="isHorizontal && isPC" mode="horizontal" mr2 :style="{ width: `calc(100% - 500px)` }" />
    <LayoutPageHeader v-if="showPageHeader" ml4 mt4px />
    <div flex-auto />
    <div v-if="isPC" flex-y-center>
      <LayoutNavGithub mr4 />
      <LayoutNavFullscreen mr4 />
      <LayoutNavDarkToggle mr4 />
      <LayoutNavDropdown />
    </div>
    <div v-else flex-y-center>
      <LayoutSiderMini />
    </div>
  </div>
</template>
