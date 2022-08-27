<script setup lang="ts">
const {
  color,
  checked = false,
  iconClass = 'text-14px',
} = defineProps<{
  /** 颜色 */
  color: string
  /** 是否选中 */
  checked: boolean
  /** 图标的 `class` */
  iconClass?: string
}>()

const whiteColors = ['#ffffff', '#fff', 'rgb(255,255,255)']
const isWhite = computed(() => whiteColors.includes(color))
</script>

<template>
  <div flex-center w-20px h-20px rounded-2px shadow cursor-pointer :style="{ backgroundColor: color }">
    <div v-if="checked" i-carbon-checkmark :class="[iconClass, isWhite ? 'text-gray-700' : 'text-white']" />
  </div>
</template>

