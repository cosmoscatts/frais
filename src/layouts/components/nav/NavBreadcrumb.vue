<script setup lang="ts">
import { MdCash } from '@vicons/ionicons4'
import type { RouteLocationMatched } from 'vue-router'

// 定义 `breadcrumb` 数据结构
interface BreadcrumbItem {
  title: string
  path?: string
}

// `breadcrumb` 数据
let metadata = $ref<BreadcrumbItem[]>([])

const route = useRoute()

/**
 * 从路由获取面包屑数据
 */
function getBreadCrumbs() {
  metadata = []
  const matched = route.matched.filter((i: RouteLocationMatched) => i.meta && i.meta.title)
  if (!matched.length)
    return
  metadata = matched.map((i) => {
    const { meta: { title }, path, children } = i
    return {
      title,
      path: children ? undefined : path,
    } as BreadcrumbItem
  })
}
getBreadCrumbs()

// 当路由发生改变时，重新生成面包屑
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
    <n-breadcrumb-item v-for="{ title, path }, idx in metadata" :key="idx" :href="path">
      <n-icon><MdCash /></n-icon> {{ title }}
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>
