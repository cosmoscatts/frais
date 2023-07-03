<script setup lang="ts">
const router = useRouter()
const goBack = () => router.push('/')
onMounted(() => useLottie({
  containerId: '#lottie',
  path: 'https://assets9.lottiefiles.com/packages/lf20_6nmazhqu.json',
}))
</script>

<template>
  <div hw-screen flex-center of-hidden>
    <n-card :style="{ width: '600px' }">
      <n-result status="404" title="404 资源不存在" description="生活总归带点荒谬" ma w-400px>
        <template #icon>
          <div id="lottie" h-200px />
        </template>
        <template #footer>
          <n-button @click="goBack">
            找点乐子吧
          </n-button>
        </template>
      </n-result>
    </n-card>
  </div>
</template>
