<script setup lang="ts">
import UserPanel from './components/UserPanel.vue'
import BasicInformation from './components/BasicInformation.vue'
import SecuritySettings from './components/SecuritySettings.vue'

// 当前显示的 `tab` 页
const currentTab = ref(1)
</script>

<template>
  <div flex="~ col">
    <UserPanel />

    <n-card mt-20px>
      <n-tabs v-model:value="currentTab" type="card" animated w-full>
        <n-tab-pane :name="1" tab="信息修改">
          <BasicInformation :current-tab="currentTab" />
        </n-tab-pane>
        <n-tab-pane :name="2" tab="安全设置">
          <SecuritySettings :current-tab="currentTab" />
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>
