<script setup lang="ts">
import { addColorAlpha } from '~/utils'

const {
  title = '',
  isActive = false,
} = defineProps<{
  title?: string
  isActive?: boolean
}>()

const refTab = ref()
const isTabHovered = useElementHover(refTab)
const { baseSettings } = storeToRefs(useAppStore())

const tabStyle = computed(() => {
  const style: Record<string, string> = {}
  const { value: { themePrimaryColor: _primaryColor } } = baseSettings
  if (isActive)
    style.backgroundColor = addColorAlpha(_primaryColor, isDark.value ? 0.15 : 0.1)

  if (isActive || isTabHovered.value)
    style.borderColor = addColorAlpha(_primaryColor, 0.3)

  return style
})
</script>

<template>
  <span
    ref="refTab"
    :style="tabStyle"
    flex="center nowrap"
    lt-sm="!min-w-70px" px-2 truncate
    text="stone-600 dark:light-600/80 13px hover:primary"
    border="1px #e5e7eb dark:#ffffff3d"
    :class="{
      '!text-primary': isActive,
    }"
  >
    <span v-if="isActive" i-ri-price-tag-3-fill mr-1 />
    <span v-else i-ri-price-tag-3-line mr-1 />
    {{ title }}
    <slot name="close" />
  </span>
</template>
