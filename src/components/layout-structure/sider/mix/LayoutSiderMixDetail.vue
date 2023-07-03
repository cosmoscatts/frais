<script setup lang="ts">
import { formatIcon, hasIcon } from '~/constants'
import { addColorAlpha } from '~/utils'

const props = defineProps<{
  label: string
  matchPathList: string[]
  activePath: string
  icon?: string
  isMini?: boolean
  isSelected?: boolean
}>()

const uiStore = useUiStore()

const { bool: isHover, setTrue, setFalse } = useBool()
const isActive = computed(() => props.matchPathList.includes(props.activePath))

const style = computed(() => {
  return isActive.value
    ? {
        backgroundColor: addColorAlpha(uiStore.settings.primaryColor, [0.1, 0.15][Number(isDark.value)]),
      }
    : {}
})
</script>

<template>
  <div mb-6px cursor-pointer px-4px @mouseenter="setTrue" @mouseleave="setFalse">
    <div
      flex-center flex-col rounded-2px bg-transparent py-12px transition-colors duration-300 ease-in-out
      :class="{ 'text-primary': isHover || isSelected || isActive }" :style="style"
    >
      <component :is="formatIcon(icon!)" v-if="hasIcon(icon)" :class="[isMini ? 'text-16px' : 'text-20px']" />
      <p
        overflow-hidden text-12px transition-height duration-300 ease-in-out
        :class="[isMini ? 'h-0 pt-0' : 'h-24px pt-4px']"
      >
        {{ label }}
      </p>
    </div>
  </div>
</template>
