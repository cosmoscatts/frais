<script setup lang="ts">
import { useThemeVars } from 'naive-ui'
import { Menu } from '../menu'
import {
  NavAvatar,
  NavBell,
  NavFullScreen,
} from './'
import { APP_LAYOUT_PARAMS, APP_META } from '~/config'

const themeVars = useThemeVars()

let showNavPanel = $ref(false)

function toggle() {
  showNavPanel = !showNavPanel
}
</script>

<template>
  <div flex-y-center>
    <button
      icon-btn text-lg
      i-carbon-menu
      @click="toggle()"
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
      <div flex-center h-50px>
        <NavAvatar />
      </div>
      <div h-50px flex-y-center>
        <div flex-auto />
        <a
          icon-btn text-lg i-carbon-logo-github mx-4
          :href="APP_META.github"
          target="_blank" title="GitHub"
        />
        <NavBell mr-4 />
        <NavFullScreen mr-4 />
        <DarkToggle mr-4 />
      </div>
    </div>
    <Menu mode="vertical" />
  </n-drawer>
</template>
