<script setup lang="ts">
import { darkTheme, dateZhCN, zhCN } from 'naive-ui'

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
useTimeoutFn(endLoading, 2200)
</script>

<template>
  <n-config-provider
    :theme="theme"
    :theme-overrides="themeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
  >
    <n-loading-bar-provider>
      <AppLoading v-if="appLoading" />
      <RouterView v-else />
    </n-loading-bar-provider>
  </n-config-provider>
</template>

