<script setup lang="ts">
const router = useRouter()
const goBack = () => router.push('/')
onMounted(() => useLottie({
  containerId: '#lottie',
  path: 'https://assets9.lottiefiles.com/packages/lf20_6nmazhqu.json',
}))
</script>

<template>
  <div hscreen wscreen flex-c of-hidden>
    <n-result status="404" title="404 资源不存在" description="生活总归带点荒谬">
      <template #icon>
        <div id="lottie" h-400px />
      </template>
      <template #footer>
        <n-button @click="goBack">
          找点乐子吧
        </n-button>
      </template>
    </n-result>
  </div>
</template>
