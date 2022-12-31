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
    <div flex="~ col">
      <div flex-col h50px>
        <Avatar />
      </div>
      <div h50px flex-y-c>
        <div flex-auto />
        <a
          icon-btn text-lg i-carbon-logo-github mx4
          :href="APP_META.github"
          target="_blank" title="GitHub"
        />
        <Bell mr4 />
        <NavFullScreen mr4 />
        <FullScreen mr4 />
      </div>
    </div>
    <TheMenu mode="vertical" />
  </n-drawer>
</template>
