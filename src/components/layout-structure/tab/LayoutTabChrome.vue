<script setup lang="ts">
import { formatIcon, hasIcon } from '~/constants'

defineProps<{
  index: number
  title: string
  active: boolean
  last: boolean
  icon?: string
}>()
const refTab = ref()
const hover = useElementHover(refTab)
const uiStore = useUiStore()
</script>

<template>
  <div
    ref="refTab" flex="inline y-center" m="r-[-18px]" relative h34px cursor-pointer px24px text="stone-600 dark:light-600/80"
    :class="{ 'z-10': active, 'z-9': hover, '!text-primary': active }"
  >
    <div absolute bottom-0 left-0 hw-full of-hidden>
      <LayoutTabChromeShape v-bind="{ hover, active, primaryColor: uiStore.settings.primaryColor }" />
    </div>
    <span relative z2 whitespace-nowrap flex="inline y-center">
      <component :is="formatIcon(icon!)" v-if="hasIcon(icon)" z-2 mr-2 :class="{ 'text-primary': active }" />
      {{ title }}
    </span>
    <LayoutTabClose v-bind="{ index }" />
    <div
      right="[-2px]" bg="[#1f2225]" absolute z2 h16px w20px scale-x-5 op100 transition="opacity 0.3s ease-in-out"
      :class="{
        '!op-0': hover || active || last,
        '!bg-[#595959]': isDark,
      }"
    />
  </div>
</template>
