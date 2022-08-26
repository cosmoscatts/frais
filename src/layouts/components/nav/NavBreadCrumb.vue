<script setup lang="ts">
import { MdCash } from '@vicons/ionicons4'
import type { RouteLocationMatched } from 'vue-router'

const route = useRoute()

interface Breadcrumb {}

// `breadcrumb` 数据
let metadata = $ref<string[]>()

// 从路由获取面包屑数据
function getBreadCrumbs() {
  metadata = []
  const matched = route.matched.filter((i: RouteLocationMatched) => i.meta && i.meta.title)
  if (!matched.length)
    return
  metadata = matched.map(i => i.meta.title as string)
}
getBreadCrumbs()

watch(
  () => route.path,
  (path) => {
    if (path.startsWith('/redirect/'))
      return
    getBreadCrumbs()
  },
)
</script>

<template>
  <n-breadcrumb separator=">">
    <n-breadcrumb-item>
      <n-icon><MdCash /></n-icon> 北京总行
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-icon><MdCash /></n-icon> 天津分行
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-icon><MdCash /></n-icon> 平山道支行
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>
