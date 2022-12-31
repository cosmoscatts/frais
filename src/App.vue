<script setup lang="ts">
import { darkTheme, dateZhCN, zhCN } from 'naive-ui'

const theme = computed(() => {
  return isDark.value
    ? darkTheme
    : null
})

// 主题覆盖
const { themeOverrides } = storeToRefs(useAppStore())
// 初始化 `loading`
const { loading: appLoading, endLoading } = useLoading(true)

// 定义 `loading` 整体时间和内层动画持续时间
const LOADING_INTERVAL = 2500
const BEFORE_LEAVING_MS = 1800
useTimeoutFn(endLoading, LOADING_INTERVAL)
</script>

<template>
  <n-config-provider
    :theme="theme"
    :theme-overrides="themeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
  >
    <n-loading-bar-provider>
      <PreLoaded v-if="appLoading" :before-leaving-ms="BEFORE_LEAVING_MS" />
      <RouterView v-else />
    </n-loading-bar-provider>
  </n-config-provider>
</template>
