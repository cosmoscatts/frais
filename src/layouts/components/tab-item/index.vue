<script setup lang="ts">
import TabButton from './TabButton.vue'
import TabChrome from './TabChrome.vue'
import type { OptionKeyType } from './context-menu'
import {
  contextMenuOptions,
  disableContextMenuOption,
  handleOptionEvent,
} from './context-menu'

const {
  index = -1,
  title = '',
  path = '/',
  length = 0,
  active = false,
  chrome = false,
} = defineProps<{
  index: number
  title: string
  path: string
  length?: number
  active?: boolean
  chrome?: boolean
}>()
defineEmits(['closeTab'])

const router = useRouter()

// 右键菜单项，判断选项是否 `disabled`
const tabContextMenuOptions = computed(() => (contextMenuOptions.map(i => ({
  ...i,
  disabled: disableContextMenuOption({
    key: i.key as OptionKeyType,
    index,
    length,
  }),
}))))

let showContextMenu = $ref(false) // 是否显示右键菜单
let offsetX = $ref(0)
let offsetY = $ref(0)

function handleContextMenu(e: MouseEvent) {
  e.preventDefault()
  showContextMenu = false
  nextTick().then(() => {
    showContextMenu = true
    offsetX = e.clientX
    offsetY = e.clientY
  })
}

function handleSelect(key: OptionKeyType) {
  showContextMenu = false
  handleOptionEvent({
    key,
    index,
    router,
  })
}
</script>

<template>
  <div hfull wfull @contextmenu="handleContextMenu">
    <RouterLink :to="{ path }">
      <TabChrome
        v-if="chrome"
        v-bind="{
          title,
          active,
          last: index === length - 1,
        }"
      >
        <template #close>
          <span
            i-ri-close-fill hover="i-carbon-close-filled" ml-1 z-2
            :class="{ '!text-[rgb(var(--primary-6))]': active }"
            @click.prevent="$emit('closeTab', index)"
          />
        </template>
      </TabChrome>
      <TabButton v-else v-bind="{ title, active }">
        <template #close>
          <span
            i-ri-close-fill hover="i-carbon-close-filled" ml-1
            @click.prevent="$emit('closeTab', index)"
          />
        </template>
      </TabButton>
    </RouterLink>
  </div>

  <n-dropdown
    placement="bottom-start"
    trigger="manual"
    :x="offsetX"
    :y="offsetY"
    :options="tabContextMenuOptions"
    :show="showContextMenu"
    :on-clickoutside="showContextMenu = false"
    @select="handleSelect"
  />
</template>
