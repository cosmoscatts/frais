<script setup lang="ts">
import { type GlobalThemeOverrides, darkTheme, dateZhCN, zhCN } from 'naive-ui'
import BaseLayout from './layouts/base-layout/index.vue'

const theme = computed(() => {
  return isDark.value
    ? darkTheme
    : null
})
const themeOverrides: GlobalThemeOverrides = {
  common: {
    // primaryColor: 'red',
  },
  LoadingBar: {
    colorLoading: '#63E2B7',
  },
}

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
      <RouterView />
      <BaseLayout />
    </n-loading-bar-provider>
  </n-config-provider>
</template>

