<script setup lang="ts">
import { useThemeVars } from 'naive-ui'
import { appMeta } from '~/config'

const {
  beforeLeavingMs = 1500,
} = defineProps<{
  beforeLeavingMs: number
}>()

const themeVars = useThemeVars()

// 控制内层动画
const { loading, endLoading } = useLoading(true)
useTimeoutFn(endLoading, beforeLeavingMs)

onMounted(() => {
  useLottie({
    container: document.querySelector('#lottie-container')!,
    path: 'https://assets2.lottiefiles.com/packages/lf20_13mYuqdmso.json',
  })
})
</script>

<template>
  <div class="loading-mask" />
  <Transition leave-active-class="animate__animated animate__bounceOut">
    <div v-if="loading" class="loading-wrapper">
      <div mb-100px>
        <div id="lottie-container" w300px h300px />
        <div class="flex-y-center animate__animated animate__fadeInUpBig animate__faster">
          <div i-carbon-rocket text="primary 40px" />
          <div ml-20px>
            <n-gradient-text
              :gradient="`linear-gradient(90deg, ${themeVars.successColor} 0%, ${themeVars.warningColor} 33%, ${themeVars.infoColor} 66%, ${themeVars.errorColor} 100%)`"
              :size="36" style="font-weight: bold;"
            >
              {{ appMeta.title }}
            </n-gradient-text>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.loading-mask {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: v-bind('themeVars.bodyColor');
  pointer-events: none;
  z-index: 10000;
}

.loading-wrapper {
  position: fixed;
  left: -300px;
  top: -300px;
  bottom: -300px;
  right: -300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: v-bind('themeVars.bodyColor');
  z-index: 10001;
}
</style>
