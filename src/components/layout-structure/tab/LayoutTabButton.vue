<script setup lang="ts">
import type { StyleValue } from 'vue'
import { addColorAlpha } from '~/utils'
import { formatIcon, hasIcon } from '~/constants'

const props = defineProps<{
  title: string
  index: number
  active: boolean
  icon?: string
}>()
const refTab = ref()
const uiStore = useUiStore()
const hover = useElementHover(refTab)
const tabStyle = computed(() => {
  const style: StyleValue = {}
  const color = uiStore.settings.primaryColor
  if (props.active)
    style.backgroundColor = addColorAlpha(color, [0.1, 0.15][Number(isDark.value)])

  if (props.active || hover.value)
    style.borderColor = addColorAlpha(color, 0.3)

  return style
})
</script>

<template>
  <span
    ref="refTab"
    flex="center nowrap"
    lt-sm="!min-w-70px" truncate px-2
    text="13px hover:primary"
    border="1px #e5e7eb dark:#ffffff3d"
    :style="tabStyle"
    :class="{ 'text-primary': active }"
  >
    <component :is="formatIcon(icon!)" v-if="hasIcon(icon)" mr-2 />
    {{ title }}
    <LayoutTabClose v-bind="{ index }" />
  </span>
</template>
