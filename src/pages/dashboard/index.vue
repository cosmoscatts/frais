<script setup lang="ts">
import { APP_LAYOUT_PARAMS } from '~/config'

defineOptions({
  name: 'Dashboard',
})

const {
  navHeight,
  tabHeight,
  footHeight,
  contentPadding,
} = APP_LAYOUT_PARAMS

const uiStore = useUiStore()

const diffHeight = computed(() => {
  let height = navHeight + footHeight + contentPadding * 2 + 1 + 1 + 3
  if (uiStore.settings.showTabs) height += tabHeight
  if (uiStore.settings.layout === 'horizontal') height += 35.5
  return height
})

const emojiArray = [
  '\\(o_o)/',
  '(o^^)o',
  '(˚Δ˚)b',
  '(^-^*)',
  '(^_^)b',
  '(╯‵□′)╯',
  '(=\'X\'=)',
  '(>_<)',
  '\\(°ˊДˋ°)/',
  'ㄟ(▔▽▔)ㄏ',
]

const getEmoji = (): string =>
  emojiArray[Math.floor(Math.random() * emojiArray.length)]

onMounted(() => useLottie({
  containerId: '#lottie',
  path: 'https://assets2.lottiefiles.com/packages/lf20_zk4EpiO6Hv.json',
}))
</script>

<template>
  <n-card :style="{ height: `calc(100vh - ${diffHeight}px)` }" flex-c>
    <div w70vw hfull flex-col-c mxa>
      <div id="lottie" w400px h200px />
      <div text-center font-bold>
        <h1 text="2xl" m="t-2 b-2">
          Hi@Everyone, {{ getEmoji() }}.
        </h1>
        <p text-xl m="t-3 b-2" w40vw mx-a>
          More concise and more efficient!
        </p>
      </div>
    </div>
  </n-card>
</template>
