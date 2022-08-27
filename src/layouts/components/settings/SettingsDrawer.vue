<script setup lang="ts">
import { CashOutline as CashIcon } from '@vicons/ionicons5'

const defaultExpandedNames = ['1', '2', '3']
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
      主色调和动画
    </n-divider>
    <n-divider>
      侧边栏
    </n-divider>
    <n-divider>
      多页签
    </n-divider>
  </n-collapse>
</template>

