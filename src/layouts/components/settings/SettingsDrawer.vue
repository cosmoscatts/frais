<script setup lang="ts">
import { CashOutline as CashIcon } from '@vicons/ionicons5'
import {
  SettingsDrawerColorPicker,
  SettingsDrawerLayoutMode,
  SettingsDrawerSelectItem,
  SettingsDrawerSwitchItem,
} from './components'

const defaultExpandedNames = ['1', '2', '3']

const appStore = useAppStore()
const { stageSettings } = storeToRefs(appStore)
</script>

<template>
  <n-collapse :default-expanded-names="defaultExpandedNames">
    <template #header-extra>
      <n-icon><CashIcon /></n-icon>
    </template>
    <template #arrow>
      <n-icon>
        <CashIcon />
      </n-icon>
    </template>
    <n-divider>
      页面布局
    </n-divider>
    <n-collapse-item title="青铜" name="1">
      <div>可以</div>
    </n-collapse-item>
    <n-collapse-item title="白银" name="2">
      <div>很好</div>
    </n-collapse-item>
    <n-collapse-item title="黄金" name="3">
      <div>真棒</div>
    </n-collapse-item>
    <n-divider>
      系统主色调
    </n-divider>
    <n-divider>
      页面功能
    </n-divider>
  </n-collapse>
</template>

