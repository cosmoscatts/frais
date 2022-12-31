<script setup lang="ts">
import TheLogo from './TheLogo.vue'
import TheMenu from './TheMenu.vue'
import TheSettings from './TheSettings.vue'
import {
  Avatar,
  Bell,
  FullScreen,
  ResponsivePanel,
} from './nav-items'
import { APP_META } from '~/config'

const uiStore = useUiStore()
const isVertical = computed(() => uiStore.settings.layout === 'vertical')
</script>

<template>
  <div flex-c pr5 border-b="1px solid [var(--n-border-color)]">
    <TheLogo v-if="!isVertical || isMobile" />
    <TheMenu v-if="!isVertical && !isMobile" mx4 />
    <div flex-auto />
    <div v-if="!isMobile" flex-y-c>
      <a
        icon-btn text-lg i-ri-github-line mr4
        :href="APP_META.github"
        target="_blank" title="GitHub"
      />
      <Bell mr4 />
      <FullScreen mr4 />
      <DarkToggle mr4 />
      <TheSettings v-if="uiStore.settings.showAppSettings" mr4 />
      <Avatar />
    </div>
    <ResponsivePanel v-else />
  </div>
</template>
