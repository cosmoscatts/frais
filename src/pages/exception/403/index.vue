<script setup lang="ts">
const router = useRouter()
const goBack = () => router.push('/')
onMounted(() => useLottie({
  containerId: '#lottie',
  path: 'https://assets2.lottiefiles.com/packages/lf20_rrw0aadx.json',
}))
</script>

<template>
  <div hscreen wscreen flex-c of-hidden>
    <n-result
      status="403"
      title="403 禁止访问"
      description="总有些门是对你关闭的"
    >
      <template #icon>
        <div id="lottie" h-400px />
      </template>
      <template #footer>
        <n-button @click="goBack">
          放轻松
        </n-button>
      </template>
    </n-result>
  </div>
</template>
