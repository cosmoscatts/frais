<script setup lang="ts">
import IconRefresh from '~icons/carbon/restart'
import IconArrowLeft from '~icons/carbon/arrow-left'
import IconArrowRight from '~icons/carbon/arrow-right'
import IconClose from '~icons/carbon/close'

const { index, length, offsetX, offsetY } = defineProps<{
  index: number
  length: number
  offsetX: number
  offsetY: number
}>()

const { show } = defineModels<{ show: boolean }>()

const router = useRouter()

const defaultOptions = [
  {
    label: '刷新当前',
    key: 'refresh',
    icon: renderIcon(IconRefresh),
  },
  {
    label: '关闭左边',
    key: 'closeLeft',
    icon: renderIcon(IconArrowLeft),
  },
  {
    label: '关闭右边',
    key: 'closeRight',
    icon: renderIcon(IconArrowRight),
  },
  {
    label: '关闭其他',
    key: 'closeOthers',
    icon: renderIcon(IconClose),
  },
]

 type OptionKeyType = 'refresh' | 'closeLeft' | 'closeRight' | 'closeOthers'

function disableOption({
  key,
  index,
  length,
}: {
  key: OptionKeyType
  index: number
  length: number
}) {
  return [
    false,
    !(length > 1 && index > 0),
    !(length > 1 && index < length - 1),
    length <= 1,
  ][[
    'refresh',
    'closeLeft',
    'closeRight',
    'closeOthers',
  ].findIndex(i => i === key)]
}

function handleOptionEvent({ key, index }: {
  key: OptionKeyType
  index: number
}) {
  const tabStore = useTabStore()
  const handleRefresh = () => { // 刷新
    const currentTab = tabStore.tabs[index]
    if (!currentTab)
      return
    nextTick(() => {
      router.replace({
        path: `/redirect${currentTab.path}`,
      })
    })
  }
  const handleCloseLeft = () => { // 关闭左边
    const currentTab = tabStore.tabs[index]
    if (!currentTab)
      return
    tabStore
      .removeListTabs(tabStore.tabs.slice(0, index))
      .then(() => router.push(currentTab.path))
  }
  const handleCloseRight = () => { // 关闭右边
    const currentTab = tabStore.tabs[index]
    if (!currentTab)
      return
    tabStore
      .removeListTabs(tabStore.tabs.slice(index + 1))
      .then(() => router.push(currentTab.path))
  }
  const handleCloseOthers = () => { // 关闭其他
    const currentTab = tabStore.tabs[index]
    if (!currentTab)
      return
    tabStore
      .removeOtherTabs(currentTab)
      .then(() => router.push(currentTab.path))
  }
  ;[
    handleRefresh,
    handleCloseLeft,
    handleCloseRight,
    handleCloseOthers,
  ][[
    'refresh',
    'closeLeft',
    'closeRight',
    'closeOthers',
  ].findIndex(i => i === key)]()
}

const options = computed(() => (defaultOptions.map(i => ({
  ...i,
  disabled: disableOption({
    key: i.key as OptionKeyType,
    index,
    length,
  }),
}))))

function handleSelect(key: OptionKeyType) {
  show.value = false
  handleOptionEvent({
    key,
    index,
  })
}
</script>

<template>
  <n-dropdown
    trigger="manual"
    placement="bottom-start"
    :show="show"
    :x="offsetX"
    :y="offsetY"
    :options="options"
    :on-clickoutside="() => show = false"
    @select="handleSelect"
  />
</template>
