<script setup lang="ts">
import { TabButton, TabChrome } from './components'

const {
  idx = -1,
  title = '',
  path = '/',
  isActive = false,
} = defineProps<{
  idx: number
  title: string
  path: string
  isActive?: boolean
}>()

const { message } = useGlobalNaiveApi()
const { baseSettings } = storeToRefs(useAppStore())

// 多页签风格是否为谷歌风格
const isChromeTabShapeStyle = computed(() => {
  return baseSettings.value.tabShapeStyle === 'chrome'
})

// 右键菜单项
const tabContextMenuOptions = [
  {
    label: '杰·盖茨比',
    key: 'jay gatsby',
  },
  {
    label: '黛西·布坎南',
    key: 'daisy buchanan',
  },
  {
    type: 'divider',
    key: 'd1',
  },
  {
    label: '尼克·卡拉威',
    key: 'nick carraway',
  },
  {
    label: '其他',
    key: 'others1',
    children: [
      {
        label: '乔丹·贝克',
        key: 'jordan baker',
      },
      {
        label: '汤姆·布坎南',
        key: 'tom buchanan',
      },
      {
        label: '其他',
        key: 'others2',
        children: [
          {
            label: '鸡肉',
            key: 'chicken',
          },
          {
            label: '牛肉',
            key: 'beef',
          },
        ],
      },
    ],
  },
]

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

// 点击菜单
function handleSelect(key: string | number) {
  showTabContextMenu = false
  message.info(String(key))
}

// 外部点击事件
function onClickoutside() {
  message.info('clickoutside')
  showTabContextMenu = false
}

// 关闭标签
function closeTag(_idx: number) {

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
        :is-last="idx === tags.length - 1"
      >
        <template #close>
          <span
            i-ri-close-fill hover="i-carbon-close-filled" ml-1 z-2
            :class="{ '!text-[rgb(var(--primary-6))]': isActive }"
            @click.prevent="closeTag(idx)"
          />
        </template>
      </TabChrome>

      <TabButton v-else :title="title" :is-active="isActive">
        <template #close>
          <span
            i-ri-close-fill hover="i-carbon-close-filled" ml-1
            @click.prevent="closeTag(idx)"
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
