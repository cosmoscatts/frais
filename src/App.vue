<script setup lang="ts">
import { darkTheme, dateZhCN, zhCN } from 'naive-ui'
import AppLoading from './components/AppLoading/index.vue'

const theme = computed(() => {
  return isDark.value
    ? darkTheme
    : null
})
const themeOverrides = ref()
const toggleDark = useToggleDark

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
    <naive-provider>
      <AppLoading
        :loading="appLoading"
      />
      <router-view />
      <n-card h-400px>
        1111
        <button @click="toggleDark()">
          切换
        </button>
      </n-card>
    </naive-provider>
  </n-config-provider>
</template>

