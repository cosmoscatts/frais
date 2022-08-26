<script setup lang="ts">
import { appLayoutParams, appMeta } from '~/config'

const { navHeight } = appLayoutParams
const title = computed(() => appMeta.title)
const appstore = useAppStore()
const { menuCollapsed, baseSettings } = storeToRefs(appstore)
const { setMenuUnCollapsed } = appstore

// TODO
watchEffect(() => {
  // 当页面布局为水平时，重置菜单折叠标志
  if (baseSettings.value.layout === 'horizontal')
    setMenuUnCollapsed()
})
</script>

<template>
  <div v-if="baseSettings.showLogo" flex-center :style="{ height: `${navHeight}px` }">
    <img
      src="https://www.naiveui.com/assets/naivelogo.93278402.svg"
      alt="头像" :style="{ width: `${navHeight * 0.68}px`, height: `${navHeight * 0.68}px` }"
    >
    <span v-if="!menuCollapsed" font="bold sans" pl-16px text-16px>
      {{ title }}
    </span>
  </div>
</template>
