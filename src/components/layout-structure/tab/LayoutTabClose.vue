<script setup lang="ts">
const { index } = defineProps<{ index: number }>()

const route = useRoute()
const router = useRouter()
const message = useMessage()

const tabStore = useTabStore()
const tabs = $computed(() => tabStore.tabs)
function handleCloseTab() {
  if (tabs.length === 1) {
    message.warning('已经是最后一个标签了')
    return
  }
  const currentTab = tabs[index]
  if (!currentTab)
    return
  tabStore
    .removeOneTab(currentTab)
    .then(() => {
      // 当关闭的是当前路由
      // 需要跳转到 `tabs` 的最后一个
      if (currentTab.path === route.path) {
        const latest = tabs.slice(-1)[0] // 找到最后一个
        router.push(latest?.path ?? '/')
      }
    })
}
</script>

<template>
  <span i-ri-close-fill hover="i-carbon-close-filled" ml-1 @click.prevent="handleCloseTab" />
</template>
