<script setup lang="ts">
import type { Component } from 'vue'
import { NIcon } from 'naive-ui'
import {
  LogOutOutline as LogoutIcon,
  PersonCircleOutline as UserIcon,
} from '@vicons/ionicons5'
import defaultAvatar from '~/assets/default-avatar.jpg'

const router = useRouter()
const authStore = useAuthStore()
const avatar = computed(() => authStore.user?.avatar ?? defaultAvatar)

const renderIcon = (icon: Component) => () => h(NIcon, null, { default: () => h(icon) })

const options = [
  {
    label: '用户资料',
    key: 'profile',
    icon: renderIcon(UserIcon),
    props: {
      onClick: () => router.push('/profile'),
    },
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon(LogoutIcon),
    props: {
      onClick: () => {
        $notification.success({
          title: '登出成功',
          content: '记得回来~',
          duration: 1000,
        })
        useTimeoutFn(() => {
          authStore
            .logout()
            .then(() => router.push('/login'))
        }, 1000)
      },
    },
  },
]
</script>

<template>
  <n-dropdown :options="options" trigger="click">
    <div flex-y-c cursor-pointer>
      <n-avatar
        round
        size="small"
        :src="avatar"
        fallback-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
      />
      <n-ellipsis v-if="!isMobile" style="max-width: 100px" ml-3>
        {{ authStore.user?.name ?? '-' }}
      </n-ellipsis>
    </div>
  </n-dropdown>
</template>
