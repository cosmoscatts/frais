<script setup lang="ts">
import { darkTheme, dateZhCN, zhCN } from 'naive-ui'

const theme = computed(() => {
  return unref(isDark)
    ? darkTheme
    : null
})
const themeOverrides = ref()
const toggle = useToggle(isDark)
</script>

<template>
  <n-config-provider
    :theme="theme"
    :theme-overrides="themeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
    class="h-full"
  >
    <naive-provider>
      <router-view />
      <n-card h-400px>
        1111
        <button @click="toggle()">
          切换
        </button>
      </n-card>
    </naive-provider>
  </n-config-provider>
</template>

