<script setup lang="ts">
const router = useRouter()
const goBack = () => router.push('/')
onMounted(() => useLottie({
  containerId: '#lottie',
  path: 'https://assets2.lottiefiles.com/packages/lf20_rrw0aadx.json',
}))
</script>

<template>
  <div hw-screen flex-center of-hidden>
    <n-card :style="{ width: '600px' }">
      <n-result status="403" title="403 禁止访问" description="总有些门是对你关闭的" ma w-400px>
        <template #icon>
          <div id="lottie" h-200px />
        </template>
        <template #footer>
          <n-button @click="goBack">
            放轻松
          </n-button>
        </template>
      </n-result>
    </n-card>
  </div>
</template>
