<script setup lang="ts">
import type { Component } from 'vue'
import { NIcon } from 'naive-ui'
import {
  LogOutOutline as LogoutIcon,
  PersonCircleOutline as UserIcon,
} from '@vicons/ionicons5'
import defaultAvatar from '~/assets/default-avatar.jpg'

// 渲染图标组件
const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    })
  }
}

// `dropdown` 选项数据
const options = [
  {
    label: '用户资料',
    key: 'profile',
    icon: renderIcon(UserIcon),
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon(LogoutIcon),
  },
]
</script>

<template>
  <n-dropdown :options="options">
    <div flex items-center cursor-pointer>
      <n-avatar
        round
        size="small"
        :src="defaultAvatar"
        fallback-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
      />
      <h4 ml-2>
        Admin
      </h4>
    </div>
  </n-dropdown>
</template>
