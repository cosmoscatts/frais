<script setup lang="ts">
import ProfileUserPanel from './components/ProfileUserPanel.vue'
import ProfileBasicInformation from './components/ProfileBasicInformation.vue'
import ProfileSecuritySettings from './components/ProfileSecuritySettings.vue'

const currentTab = ref(1)
</script>

<template>
  <div flex="~ col">
    <ProfileUserPanel />

    <n-card mt-20px>
      <n-tabs v-model:value="currentTab" type="card" animated w-full>
        <n-tab-pane :name="1" tab="信息修改">
          <ProfileBasicInformation :current-tab="currentTab" />
        </n-tab-pane>
        <n-tab-pane :name="2" tab="安全设置">
          <ProfileSecuritySettings :current-tab="currentTab" />
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>
