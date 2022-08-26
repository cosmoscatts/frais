<script setup lang="ts">
import { darkTheme, dateZhCN, zhCN } from 'naive-ui'
import { useHeadMeta } from './composables/useHeadMeta'
import BaseLayout from './layouts/base-layout/index.vue'

const theme = computed(() => {
  return isDark.value
    ? darkTheme
    : null
})

// `useHead` 创建 `head` 数据
useHeadMeta()
// 主题覆盖
const { themeOverrides } = storeToRefs(useAppStore())
// 初始化 `loading`
const { loading: appLoading, startLoading, endLoading } = useLoading()
startLoading()
useTimeoutFn(endLoading, 1000)
</script>

<template>
  <n-config-provider
    :theme="theme"
    :theme-overrides="themeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
  >
    <AppLoading
      :loading="appLoading"
    />
    <n-loading-bar-provider>
      <RouterView />
      <BaseLayout />
    </n-loading-bar-provider>
  </n-config-provider>
</template>

