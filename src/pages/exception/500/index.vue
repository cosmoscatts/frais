<script setup lang="ts">
const router = useRouter()
const goBack = () => router.push('/')
onMounted(() => useLottie({
  containerId: '#lottie',
  path: 'https://assets3.lottiefiles.com/packages/lf20_ge2cws3x.json',
}))
</script>

<template>
  <div hscreen wscreen flex-c of-hidden>
    <n-result
      status="500"
      title="500 服务器错误"
      description="服务器出错可能说明该雇更多程序员了"
    >
      <template #icon>
        <div id="lottie" h-400px />
      </template>
      <template #footer>
        <n-button @click="goBack">
          散财消灾
        </n-button>
      </template>
    </n-result>
  </div>
</template>
