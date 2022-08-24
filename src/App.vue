<script setup lang="ts">
import { darkTheme, dateZhCN, zhCN } from 'naive-ui'
import BaseLayout from './layouts/base-layout/index.vue'

const theme = computed(() => {
  return isDark.value
    ? darkTheme
    : null
})
const themeOverrides = ref()

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
    <n-global-style />
    <AppLoading
      :loading="appLoading"
    />
    <n-loading-bar-provider>
      <router-view />
      <BaseLayout />
    </n-loading-bar-provider>
  </n-config-provider>
</template>

