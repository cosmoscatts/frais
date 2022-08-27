<script setup lang="ts">
import { CashOutline as CashIcon } from '@vicons/ionicons5'

const defaultExpandedNames = ['1', '2', '3']

const appStore = useAppStore()
const { stageSettings } = storeToRefs(appStore)

// 页面布局 - layout | fixNav | showLogo | showTabs | showFoot 5
// 主色调 - primaryColor 1
// 页面功能 - 开启动画 | 动画类型 | 多页签风格 | 多页签缓存 | 反转菜单色 | 侧边栏触发器样式 6
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

