<script setup lang="ts">
import { dateZhCN, zhCN } from 'naive-ui'
</script>

<template>
  <n-config-provider
    :theme="nTheme"
    :theme-overrides="nThemeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
  >
    <n-message-provider>
      <n-loading-bar-provider>
        <AppProvider>
          <RouterView />
        </AppProvider>
      </n-loading-bar-provider>
    </n-message-provider>
  </n-config-provider>
</template>
