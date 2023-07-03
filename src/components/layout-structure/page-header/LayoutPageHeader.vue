<script setup lang="ts">
import { formatIcon, hasIcon } from '~/constants'
import type { Menu } from '~/types'

const route = useRoute()

let data = $ref<Menu[]>([])
function getBreadCrumbs() {
  data = getMatchedMenuItemsIfParentExist(route.path)
}
getBreadCrumbs()

watch(() => route.path, (path) => {
  if (!path.startsWith('/redirect/'))
    getBreadCrumbs()
})

function formatOptions(menus: Menu[]) {
  return menus.map((i) => {
    const option = formatMenuOption(i, false)
    return {
      ...option,
      disabled: route.path === option.path,
    }
  })
}
</script>

<template>
  <n-page-header flex-y-center>
    <n-breadcrumb>
      <n-breadcrumb-item v-for="{ label, icon, children }, idx in data" :key="idx">
        <n-dropdown v-if="children?.length" :options="formatOptions(children)">
          <div class="trigger">
            <component :is="formatIcon(icon!)" v-if="hasIcon(icon)" mr-2 text-16px />
            {{ label }}
          </div>
        </n-dropdown>
        <template v-else>
          <component :is="formatIcon(icon!)" v-if="hasIcon(icon)" mr-2 text-16px />
          {{ label }}
        </template>
      </n-breadcrumb-item>
    </n-breadcrumb>
  </n-page-header>
</template>
