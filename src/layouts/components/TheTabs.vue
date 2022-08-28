<script setup lang="ts">
import { TabItem } from './tab'
import type { Tab } from '~/types'

const route = useRoute()
const router = useRouter()
const { message } = useGlobalNaiveApi()

const tabStore = useTabStore()
const { baseSettings } = storeToRefs(useAppStore())

// 多页签风格是否为谷歌风格
const isChromeTabShapeStyle = computed(() => {
  return baseSettings.value.tabShapeStyle === 'chrome'
})

// 多页签集合
const tabs = $computed(() => {
  return tabStore.visitedTabs || []
})

/**
 * 添加 `tab`
 */
function addTag() {
  const { name, path, meta: { title, cached } } = route
  if ([title, path].some(i => !i))
    return
  tabStore.addOneTab({
    path,
    name,
    title,
    cached,
  } as Tab)
}
addTag()
watch(() => route.path, () => {
  addTag()
})

/**
 * 判断是否为当前路由，即当前页面
 */
function isActive(path?: string) {
  if (!path)
    return false
  if (route.path.startsWith('/redirect'))
    return `/redirect${path}` === route.path
  return path === route.path
}

/**
 * 关闭选中的 `tab`
 */
function closeTag(idx: number) {
  if (tabs.length === 1) {
    message.warning('已经是最后一个标签了')
    return
  }

  const tab = tabs[idx]
  if (!tab)
    return
  tabStore.removeOneTab(tab).then(() => {
    // 当关闭的是当前路由，需要跳转到 `tabs` 的最后一个
    if (tab.path === route.path) {
      // 找到最后一个
      const latest = tabs.slice(-1)[0]
      const path = latest
        ? latest.path
        : '/'
      router.push(path)
    }
  })
}

const refTag = ref()
const refContainer = ref()
const refScrollWrapper = ref()

const { width: refContainerWidth, left: refContainerLeft } = useElementBounding(refContainer)

// 当前显示的 `tab` 索引
const activeTagIndex = computed(() => {
  const redirectPrefix = '/redirect'
  const activePath = route.path.startsWith(redirectPrefix)
    ? route.path.substring(redirectPrefix.length)
    : route.path
  return tabs.findIndex(i => i.path === activePath) || -1
})

async function getActiveTabClientX() {
  await nextTick()
  if (refTag.value && refTag.value?.children?.length && refTag.value.children[activeTagIndex.value]) {
    const activeTagEl = refTag.value.children[activeTagIndex.value]
    const { x, width } = activeTagEl.getBoundingClientRect()
    const clientX = x + width / 2
    useTimeoutFn(() => {
      handleScroll(clientX)
    }, 50)
  }
}

/**
 * 处理多页签滚动
 */
function handleScroll(clientX: number) {
  const currentX = clientX - refContainerLeft.value
  const deltaX = currentX - refContainerWidth.value / 2
  if (refScrollWrapper.value) {
    const { maxScrollX, x: leftX } = refScrollWrapper.value.instance
    const rightX = maxScrollX - leftX
    const update = deltaX > 0 ? Math.max(-deltaX, rightX) : Math.min(-deltaX, -leftX)
    refScrollWrapper.value?.instance.scrollBy(update, 0, 300)
  }
}
watch(
  activeTagIndex,
  () => {
    getActiveTabClientX()
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <div ref="refContainer" of-hidden mx-1rem style="width: calc(100% - 2rem);">
    <ScrollWrapper ref="refScrollWrapper" :options="{ scrollX: true, scrollY: false, click: true }">
      <div
        ref="refTag" h-full
        :class="[
          isChromeTabShapeStyle
            ? 'flex items-end pr-7'
            : 'flex !items-center gap-x-2 mt-1px',
        ]"
      >
        <div
          v-for="{ title, path }, idx in tabs" :key="idx"
          h-26px lh-26px wa flex-inline items-center cursor-pointer
          :class="{ 'ha max-h-full': isChromeTabShapeStyle }"
        >
          <TabItem
            :idx="idx"
            :title="title"
            :path="path"
            :tabs-length="tabs.length"
            :is-active="isActive(path)"
            :is-chrome-tab-shape-style="isChromeTabShapeStyle"
            @close-tag="closeTag"
          />
        </div>
      </div>
    </ScrollWrapper>
  </div>
</template>
