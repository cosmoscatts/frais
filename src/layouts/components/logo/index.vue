<script setup lang="ts">
import { appLayoutParams, appMeta } from '~/config'

const { navHeight } = appLayoutParams
const title = computed(() => appMeta.title)
const appstore = useAppStore()
const { menuCollapsed, baseSettings } = storeToRefs(appstore)
const { setMenuUnCollapsed } = appstore
const { width } = useWindowSize()
let hiddenTitle = $ref(false)
watchEffect(() => {
  // 当屏幕尺寸小于 1200px 时，隐藏 title
  hiddenTitle = width.value < 1200
  // 当页面布局为水平时，重置菜单折叠标志
  if (baseSettings.value.layout === 'horizontal')
    setMenuUnCollapsed()
})
</script>

<template>
  <div v-if="baseSettings.showLogo" flex justify-center items-center :style="{ height: `${navHeight}px` }">
    <img
      src="https://www.naiveui.com/assets/naivelogo.93278402.svg"
      alt="" h-34px w-34px
    >
    <span v-if="!menuCollapsed && !hiddenTitle" font="bold sans" pl-8px text-16px>
      {{ title }}
    </span>
  </div>
</template>
