<script setup lang="ts">
import type { RouteLocationMatched } from 'vue-router'
import { ExtensionPuzzleOutline } from '@vicons/ionicons5'

interface BreadcrumbItem {
  title: string
  path?: string
}

const route = useRoute()
let data = $ref<BreadcrumbItem[]>([])

function getBreadCrumbs() {
  const matched = route
    .matched
    .filter((i: RouteLocationMatched) => i.meta && i.meta.title)
  if (!matched.length) return
  data = matched.map(i => ({
    title: i.meta.title,
    path: i.children ? undefined : i.path,
  } as BreadcrumbItem))
}
getBreadCrumbs()
watch(
  () => route.path,
  (path) => {
    if (!path.startsWith('/redirect/')) {
      getBreadCrumbs()
    }
  },
)
</script>

<template>
  <n-page-header flex-y-c>
    <n-breadcrumb>
      <n-breadcrumb-item
        v-for="{ title, path }, idx in data"
        :key="idx" :href="path"
      >
        <n-icon :component="ExtensionPuzzleOutline" />
        {{ title }}
      </n-breadcrumb-item>
    </n-breadcrumb>
  </n-page-header>
</template>
