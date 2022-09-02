<script setup lang="ts">
import type { Component } from 'vue'
import { NIcon } from 'naive-ui'
import {
  LogOutOutline as LogoutIcon,
  PersonCircleOutline as UserIcon,
} from '@vicons/ionicons5'
import defaultAvatar from '~/assets/default-avatar.jpg'

const router = useRouter()
const { user } = storeToRefs(useUserStore())
const { notification } = useGlobalNaiveApi()

const avatar = computed(() => {
  return user.value?.avatar ?? defaultAvatar
})

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
    props: {
      onClick: () => {
        router.push('/profile')
      },
    },
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon(LogoutIcon),
    props: {
      onClick: () => {
        notification.success({
          title: '登出成功',
          content: '记得回来~',
          duration: 1000,
        })
        useTimeoutFn(() => {
          router.push('/login')
          useLogout()
        }, 1000)
      },
    },
  },
]
</script>

<template>
  <n-dropdown :options="options" trigger="click">
    <div flex items-center cursor-pointer>
      <n-avatar
        round
        size="small"
        :src="avatar"
        fallback-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
      />
      <n-ellipsis style="max-width: 100px" ml-3>
        机器人 bot
      </n-ellipsis>
    </div>
  </n-dropdown>
</template>
