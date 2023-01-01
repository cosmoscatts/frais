<script setup lang="ts">
import { darkTheme, dateZhCN, zhCN } from 'naive-ui'

createUi()
const theme = computed(() => [null, darkTheme][Number(isDark.value)])

const LOADING_INTERVAL = 1800
const BEFORE_LEAVING_MS = 1200
const { loading, endLoading } = useLoading(true)
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
      <PreLoadPage v-if="loading" :before-leaving-ms="BEFORE_LEAVING_MS" />
      <RouterView />
    </n-loading-bar-provider>
  </n-config-provider>
</template>
