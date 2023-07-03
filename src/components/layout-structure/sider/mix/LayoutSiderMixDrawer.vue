<script setup lang="ts">
import { APP_META as meta, LAYOUT_PARAMS as params } from '~/constants'
import type { Menu } from '~/types'

const props = defineProps<{
  visible: boolean
  menus: Menu[]
}>()

const uiStore = useUiStore()
const showDrawer = computed(() => (props.visible && props.menus.length) || uiStore.mixSideFixed)

const drawerStyle = computed(() => {
  if (!showDrawer.value)
    return {}
  return isDark.value
    ? {
        borderRight: '1px solid #484849',
      }
    : { boxShadow: '2px 0 8px 0 rgb(29 35 41 / 5%)' }
})
</script>

<template>
  <div
    relative h-full border-l-1px transition-width duration-300 ease-in-out base-border
    :style="{ width: uiStore.mixSideFixed ? `${params.mixSideDrawerWidth}px` : '0px' }"
  >
    <div
      absolute left-0 top-0 h-full flex-col items-stretch overflow-hidden whitespace-nowrap bg-body
      :style="{ width: showDrawer ? `${params.mixSideDrawerWidth}px` : '0px', ...drawerStyle }"
    >
      <header flex-y-center justify-between px5px :style="{ height: `${params.navHeight}px` }">
        <h2 pl-8px text-24px font-bold text-primary>
          {{ meta.name }}
        </h2>
        <div cursor-pointer px-8px text-14px text-gray-600 @click="uiStore.toggleMixSideFixed">
          <n-popover>
            <template #trigger>
              <div v-if="uiStore.mixSideFixed" i-mdi-pin-off text-red />
              <div v-else i-mdi-pin icon-btn />
            </template>
            {{ uiStore.mixSideFixed ? '取消固定' : '固定' }}
          </n-popover>
        </div>
      </header>
      <LayoutMenu mode="vertical" no-collapse enable-props-menu :menu-children="menus" flex-1 />
    </div>
  </div>
</template>
