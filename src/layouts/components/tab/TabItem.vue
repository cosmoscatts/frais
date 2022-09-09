<script setup lang="ts">
import { TabButton, TabChrome } from './components'
import type { TabContextMenuOptionKeyType } from './tabContextMenu'
import {
  baseTabContextMenuOptions,
  handleTabContextMenuOptionFn,
  isTabContextMenuOptionDisabled,
} from './tabContextMenu'

const {
  idx = -1,
  title = '',
  path = '/',
  tabsLength = 0,
  isActive = false,
  isChromeTabShapeStyle = false,
} = defineProps<{
  idx: number
  title: string
  path: string
  tabsLength?: number
  isActive?: boolean
  isChromeTabShapeStyle?: boolean
}>()

const emits = defineEmits(['closeTag'])

// 右键菜单项，判断选项是否 `disabled`
const tabContextMenuOptions = computed(() => {
  return baseTabContextMenuOptions.map((i) => {
    return {
      ...i,
      disabled: isTabContextMenuOptionDisabled({
        key: i.key as TabContextMenuOptionKeyType,
        tabIdx: idx,
        tabsLength,
      }),
    }
  })
})

// 是否显示右键菜单
let showTabContextMenu = $ref(false)
// 坐标偏移量
let offsetX = $ref(0)
let offsetY = $ref(0)

// 显示右键菜单
function handleContextMenu(e: MouseEvent) {
  e.preventDefault()
  showTabContextMenu = false
  nextTick().then(() => {
    showTabContextMenu = true
    offsetX = e.clientX
    offsetY = e.clientY
  })
}

const router = useRouter()

/**
 * 点击右键菜单
 */
function handleSelect(key: TabContextMenuOptionKeyType) {
  showTabContextMenu = false
  handleTabContextMenuOptionFn({
    tabIdx: idx,
    optionKey: key,
    router,
  })
}

/**
 * 外部点击事件
 */
function onClickoutside() {
  showTabContextMenu = false
}

/**
 * 关闭标签
 */
function handleCloseTag(idx: number) {
  emits('closeTag', idx)
}
</script>

<template>
  <div hw-full @contextmenu="handleContextMenu">
    <RouterLink
      :to="{ path }"
    >
      <TabChrome
        v-if="isChromeTabShapeStyle"
        :title="title"
        :is-active="isActive"
        :is-last="idx === tabsLength - 1"
      >
        <template #close>
          <span
            i-ri-close-fill hover="i-carbon-close-filled" ml-1 z-2
            :class="{ '!text-[rgb(var(--primary-6))]': isActive }"
            @click.prevent="handleCloseTag(idx)"
          />
        </template>
      </TabChrome>

      <TabButton v-else :title="title" :is-active="isActive">
        <template #close>
          <span
            i-ri-close-fill hover="i-carbon-close-filled" ml-1
            @click.prevent="handleCloseTag(idx)"
          />
        </template>
      </TabButton>
    </RouterLink>
  </div>

  <n-dropdown
    placement="bottom-start"
    trigger="manual"
    :x="offsetX"
    :y="offsetY"
    :options="tabContextMenuOptions"
    :show="showTabContextMenu"
    :on-clickoutside="onClickoutside"
    @select="handleSelect"
  />
</template>
