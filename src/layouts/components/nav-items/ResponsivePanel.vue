<script setup lang="ts">
import { useThemeVars } from 'naive-ui'
import TheMenu from '../TheMenu.vue'
import {
  Avatar,
  Bell,
  FullScreen,
} from '.'
import { APP_LAYOUT_PARAMS, APP_META } from '~/config'

const themeVars = useThemeVars()
const showNavPanel = ref(false)
</script>

<template>
  <div flex-y-c>
    <button
      icon-btn text-lg i-carbon-menu
      @click="showNavPanel = !showNavPanel"
    />
  </div>
  <n-drawer
    :style="{
      backgroundColor: themeVars.cardColor,
    }"
    :width="APP_LAYOUT_PARAMS.sideWidth"
    :auto-focus="false"
    :show="showNavPanel"
    placement="right"
    display-directive="show"
    @mask-click="showNavPanel = false"
  >
    <div flex-y-c h50px px4>
      <Avatar />
      <div flex-auto />
      <a
        icon-btn text-lg i-ri-github-line mx4
        :href="APP_META.github"
        target="_blank" title="GitHub"
      />
      <Bell mr4 />
      <FullScreen mr4 />
      <DarkToggle />
    </div>
    <TheMenu mode="vertical" />
  </n-drawer>
</template>
