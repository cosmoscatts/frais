<script setup lang="ts">
import type { Tab } from '~/types'

const route = useRoute()

const uiStore = useUiStore()
const tabStore = useTabStore()

tabStore.createTabs()

const chrome = computed(() => uiStore.settings.tabShapeStyle === 'chrome')
const tabs = $computed(() => tabStore.tabs)

function isActive(path?: string) { // 判断是否为当前页面
  if (!path)
    return false
  if (route.path.startsWith('/redirect'))
    path = `/redirect${path}`
  return path === route.path
}

function findTabIcon(path: string) {
  if (path === '/profile')
    return 'profile'
  const menus = getUserFlattenMenuTree().filter(item => !!item.path)
  if (!menus.length)
    return undefined
  return menus.find(i => i.path === path)?.icon
}

function addTab() {
  const { name, path, meta: { title, cached } } = route
  if ([title, path].some(i => !i))
    return
  tabStore.addTab({
    path,
    name,
    title,
    cached,
    icon: findTabIcon(path),
  } as Tab)
}
addTab()
watch(() => route.path, addTab)

const refTab = ref()
const refContainer = ref()
const refScrollWrapper = ref()

const activeTabIndex = computed(() => {
  const redirectPrefix = '/redirect'
  const activePath = route.path.startsWith(redirectPrefix)
    ? route.path.substring(redirectPrefix.length)
    : route.path
  return tabs.findIndex(i => i.path === activePath)
})

function getActiveTabClientX() {
  nextTick()
    .then(() => {
      if (refTab.value?.children?.length
      && refTab.value.children[activeTabIndex.value]) {
        const activeTabEl = refTab.value.children[activeTabIndex.value]
        const { x, width } = activeTabEl.getBoundingClientRect()
        const clientX = x + width / 2
        useTimeoutFn(() => {
          handleScroll(clientX)
        }, 50)
      }
    })
}

const { width: refContainerWidth, left: refContainerLeft } = useElementBounding(refContainer)
function handleScroll(clientX: number) { // 处理多页签滚动
  if (!refScrollWrapper.value)
    return
  const currentX = clientX - refContainerLeft.value
  const deltaX = currentX - refContainerWidth.value / 2
  const { maxScrollX, x: leftX } = refScrollWrapper.value.instance
  const rightX = maxScrollX - leftX
  const update = deltaX > 0 ? Math.max(-deltaX, rightX) : Math.min(-deltaX, -leftX)
  refScrollWrapper.value?.instance.scrollBy(update, 0, 300)
}
watch(activeTabIndex, getActiveTabClientX, { immediate: true })
</script>

<template>
  <div ref="refContainer" of-hidden border-b-1px px2 base-border bg-body>
    <CommonScrollWrapper ref="refScrollWrapper" :options="{ scrollX: true, scrollY: false, click: true }">
      <div
        ref="refTab" h-full
        :class="[
          chrome
            ? 'flex items-end pr-7'
            : 'flex !items-center gap-x-2 mt-1px',
        ]"
      >
        <div
          v-for="{ title, path, icon }, index in tabs" :key="index"
          h-26px wa flex-inline cursor-pointer items-center lh-26px
          :class="{ 'ha max-h-full': chrome, 'hfull mt10px': !chrome }"
        >
          <LayoutTabItem
            v-bind="{
              index,
              title,
              path,
              icon,
              length: tabs.length,
              active: isActive(path),
              chrome,
            }"
          />
        </div>
      </div>
    </CommonScrollWrapper>
  </div>
</template>
