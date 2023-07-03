<script setup lang="ts">
const {
  length = 0,
  active = false,
  chrome = false,
} = defineProps<{
  index: number
  title: string
  path: string
  icon?: string
  length?: number
  active?: boolean
  chrome?: boolean
}>()

let showContextMenu = $ref(false) // 是否显示右键菜单
let offsetX = $ref(0)
let offsetY = $ref(0)

function handleContextMenu(e: MouseEvent) {
  e.preventDefault()
  showContextMenu = false
  nextTick().then(() => {
    showContextMenu = true
    offsetX = e.clientX
    offsetY = e.clientY
  })
}
</script>

<template>
  <div hw-full @contextmenu="handleContextMenu">
    <RouterLink :to="{ path }">
      <LayoutTabChrome
        v-if="chrome"
        v-bind="{ index, title, icon, active, last: index === length - 1 }"
      />
      <LayoutTabButton v-else v-bind="{ index, title, icon, active }" />
    </RouterLink>
  </div>

  <LayoutTabContextMenu
    v-model:show="showContextMenu"
    v-bind="{
      index,
      length,
      icon,
      offsetX,
      offsetY,
    }"
  />
</template>
