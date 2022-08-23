<script setup lang="ts">
import { appMeta } from '~/config'

const title = computed(() => appMeta.title)
const appstore = useAppStore()
const { menuCollapsed, baseSettings } = storeToRefs(appstore)
const { toggleMenuCollapsed } = appstore
const { width } = useWindowSize()
let hiddenTitle = $ref(false)
watchEffect(() => {
  // 当屏幕尺寸小于 1200px 时，隐藏 title
  hiddenTitle = width.value < 1200
  // 当页面布局为水平时，重置菜单折叠标志
  if (baseSettings.value.layout === 'horizontal')
    toggleMenuCollapsed()
})
</script>

<template>
  <div v-if="baseSettings.showLogo" h-50px flex justify-center items-center>
    <img src="https://www.naiveui.com/assets/naivelogo.93278402.svg" alt="" h-34px w-34px :class="menuCollapsed || hiddenTitle ? '' : 'mr-5'">
    <h1 v-if="!menuCollapsed && !hiddenTitle" font="bold serif" text-2xl op50>
      {{ title }}
    </h1>
  </div>
</template>
