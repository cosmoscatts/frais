<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'
import { APP_LAYOUT_PARAMS, APP_META } from '~/config'

const { title } = APP_META
const { navHeight } = APP_LAYOUT_PARAMS

const appstore = useAppStore()
const { menuCollapsed, baseSettings, isMobile } = storeToRefs(appstore)
const { setMenuUnCollapsed } = appstore

watchEffect(() => {
  // 当页面布局为水平时，重置菜单折叠标志
  if (baseSettings.value.layout === 'horizontal')
    setMenuUnCollapsed()
})

const isHorizontalLayout = computed(() => baseSettings.value.layout === 'horizontal')

const breakpoints = useBreakpoints(breakpointsTailwind)
const hiddenTitle = breakpoints.smaller('lg')
</script>

<template>
  <div
    v-if="baseSettings.showLogo"
    flex-center :style="{ height: `${navHeight}px` }"
    :class="{ 'ml-4': isHorizontalLayout }"
  >
    <!-- <img
      src="https://www.naiveui.com/assets/naivelogo.93278402.svg"
      alt="Logo" :style="{ width: `${navHeight * 0.65}px !important`, height: `${navHeight * 0.65}px !important` }"
    > -->
    <div i-carbon-rocket text="primary 24px" />
    <span
      v-if="!menuCollapsed && (!hiddenTitle || !isHorizontalLayout || isMobile)"
      font="bold sans" pl-16px text-16px
    >
      {{ title }}
    </span>
  </div>
</template>
