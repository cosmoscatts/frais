<script setup lang="ts">
import ImageNoPermission from '~/assets/403.png'

const router = useRouter()
function goBack() {
  router.push('/')
}
</script>

<template>
  <div hw-screen flex-center of-hidden>
    <n-result
      status="403"
      title="403 禁止访问"
      description="总有些门是对你关闭的"
    >
      <template #icon>
        <img :src="ImageNoPermission" h-400px>
      </template>
      <template #footer>
        <n-button @click="goBack">
          放轻松
        </n-button>
      </template>
    </n-result>
  </div>
</template>
