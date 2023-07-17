<script setup lang="ts">
import type { Menu } from '~/types'
import { LAYOUT_PARAMS as params } from '~/constants'

const route = useRoute()
const router = useRouter()
const uiStore = useUiStore()
const authStore = useAuthStore()
const { bool: drawerVisible, setTrue: openDrawer, setFalse: hideDrawer } = useBool()

let activeParentMenuId = $ref<number>()

const firstDegreeMenus = computed(() =>
  authStore.menus.map((item) => {
    const has = (item: Menu) => Boolean(item.children && item.children.length)
    const fn = (item: Menu): string[] => {
      if (!has(item))
        return item.path ? [item.path] : []
      return item.children!.flatMap(i => fn(i), Number.POSITIVE_INFINITY).filter(Boolean)
    }
    return {
      ...item,
      hasChildren: has(item),
      matchPathList: fn(item),
    }
  }),
)

function getActiveParentMenuId() {
  activeParentMenuId = undefined
  firstDegreeMenus.value.some((item) => {
    const flag = item.matchPathList.includes(route.path)
    if (flag)
      activeParentMenuId = item.id
    return flag
  })
}

function handleMixMenu(id: number, path: string | undefined, hasChildren: boolean) {
  activeParentMenuId = id
  if (hasChildren)
    openDrawer()

  else
    if (path)
      router.push(path)
}

function resetFirstDegreeMenus() {
  batchInvoke([getActiveParentMenuId, hideDrawer])
}

const activeChildMenus = computed(() => {
  return authStore.menus.find(i => i.id === activeParentMenuId)?.children ?? []
})

watch(() => route.path, getActiveParentMenuId, { immediate: true })
</script>

<template>
  <div h-full flex bg-body @mouseleave="resetFirstDegreeMenus">
    <div h-full flex flex-col of-hidden :style="{ width: uiStore.collapseSide.state ? `${params.mixSideCollapsedWidth}px` : `${params.mixSideWidth}px` }">
      <LayoutLogo />
      <n-scrollbar mt-5px flex-1 of-hidden>
        <LayoutSiderMixDetail
          v-for="item in firstDegreeMenus"
          :key="item.path"
          :label="item.label"
          :match-path-list="item.matchPathList"
          :active-path="route.path"
          :icon="item.icon"
          :is-mini="uiStore.collapseSide.state"
          :is-selected="activeParentMenuId === item.id"
          @click="handleMixMenu(item.id, item.path, item.hasChildren)"
        />
      </n-scrollbar>
      <LayoutSiderMixCollapse />
    </div>
    <LayoutSiderMixDrawer :visible="drawerVisible" :menus="activeChildMenus" />
  </div>
</template>
