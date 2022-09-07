<script setup lang="ts">
import ImageNotFound from '~/assets/404.png'

const router = useRouter()
function goBack() {
  router.push('/')
}
</script>

<template>
  <div hw-screen flex-center of-hidden>
    <n-result status="404" title="404 资源不存在" description="生活总归带点荒谬">
      <template #icon>
        <img :src="ImageNotFound" h-400px>
      </template>
      <template #footer>
        <n-button @click="goBack">
          找点乐子吧
        </n-button>
      </template>
    </n-result>
  </div>
</template>
