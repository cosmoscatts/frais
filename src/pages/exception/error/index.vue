<script setup lang="ts">
import ImageErrorPage from '~/assets/500.png'

const router = useRouter()
function goBack() {
  router.push('/')
}
</script>

<template>
  <div hw-screen flex-center of-hidden>
    <n-result
      status="500"
      title="500 服务器错误"
      description="服务器出错可能说明该雇更多程序员了"
    >
      <template #icon>
        <img :src="ImageErrorPage" h-400px>
      </template>
      <template #footer>
        <n-button @click="goBack">
          散财消灾
        </n-button>
      </template>
    </n-result>
  </div>
</template>
