<script setup lang="ts">
import { DEFAULT_AVATAR, formatIcon } from '~/constants'

const notification = useNotification()

const router = useRouter()
const authStore = useAuthStore()
const avatar = computed(() => authStore.user?.avatar ?? DEFAULT_AVATAR)

const options = [
  {
    label: '用户资料',
    key: 'profile',
    icon: renderIcon(formatIcon('user')),
    props: {
      onClick: () => router.push('/profile'),
    },
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon(formatIcon('logout')),
    props: {
      onClick: () => {
        authStore.logout()
        router.push('/login')
        notification.success({
          avatar: renderAvatar(avatar),
          title: '登出成功',
          content: '记得回来~',
          duration: 1000,
        })
      },
    },
  },
]
</script>

<template>
  <n-dropdown :options="options" trigger="hover">
    <div flex-y-center cursor-pointer>
      <n-avatar round size="small" :src="avatar" />
      <n-ellipsis v-if="!isMobile" :style="{ maxWidth: '100px' }" ml-3>
        {{ nonNullStr(authStore.user?.name) }}
      </n-ellipsis>
    </div>
  </n-dropdown>
</template>
