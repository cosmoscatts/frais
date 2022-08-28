<script setup lang="ts">
import BScroll from '@better-scroll/core'
import type { Options } from '@better-scroll/core'

// better-scroll
// https://better-scroll.github.io/docs/zh-CN/guide/base-scroll-options.html
const {
  options = {},
} = defineProps<{
  options: Options
}>()

const instance = ref<BScroll>()

const refScrollWrapper = ref<HTMLElement>()
const refScrollContent = ref<HTMLElement>()

const isScrollY = computed(() => Boolean(options.scrollY))

function initBetterScroll() {
  if (!refScrollWrapper.value)
    return
  instance.value = new BScroll(refScrollWrapper.value, options)
}

const { width, height } = useElementSize(refScrollContent)
const { width: wrapperWidth } = useElementSize(refScrollWrapper)

watch(
  [
    () => width.value,
    () => height.value,
    () => wrapperWidth.value,
  ],
  () => {
    if (instance.value)
      instance.value.refresh()
  },
)

onMounted(() => {
  initBetterScroll()
})

defineExpose({ instance })
</script>

<template>
  <div ref="refScrollWrapper" h-full text-left>
    <div ref="refScrollContent" inline-block :class="{ 'h-full': !isScrollY }">
      <slot />
    </div>
  </div>
</template>
