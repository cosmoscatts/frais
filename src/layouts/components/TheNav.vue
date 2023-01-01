<script setup lang="ts">
import TheLogo from './TheLogo.vue'
import TheMenu from './TheMenu.vue'
import {
  Avatar,
  Bell,
  FullScreen,
  ResponsivePanel,
} from './nav-items'
import { APP_META, APP_LAYOUT_PARAMS as PARAMS } from '~/config'

const uiStore = useUiStore()
const isVertical = computed(() => uiStore.settings.layout === 'vertical')
const logoWidth = computed(() => (isPC.value && !isVertical.value)
  ? PARAMS.sideWidth
  : PARAMS.sideCollapsedWidth,
)
</script>

<template>
  <div flex-c pr5 border-b="1px solid [var(--n-border-color)]">
    <TheLogo v-if="!isVertical || isMobile" :style="{ width: `${logoWidth}px` }" />
    <TheMenu v-if="!isVertical && isPC" mx4 />
    <PageHeader v-if="isVertical && isPC" ml4 />
    <div flex-auto />
    <div v-if="isPC" flex-y-c>
      <a
        icon-btn text-lg i-ri-github-line mr4
        :href="APP_META.github"
        target="_blank" title="GitHub"
      />
      <Bell mr4 />
      <FullScreen mr4 />
      <DarkToggle mr4 />
      <Avatar />
    </div>
    <ResponsivePanel v-else />
  </div>
</template>
