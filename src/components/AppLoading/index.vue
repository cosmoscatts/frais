<script setup lang="ts">
const {
  loading = false,
} = defineProps<{
  loading: boolean
}>()

// const { settings } = storeToRefs(useAppStore())
</script>

<template>
  <Teleport to="body">
    <div class="wrapper" bg="white dark:[#17171A]" :class="loading ? 'block' : 'hidden'">
      <div class="mask" />
      <div class="logo" i-carbon-campsite text=" white" />
    </div>
  </Teleport>
</template>

<style scoped>
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  animation-name: scale;
  animation-duration: 1.5s;
  animation-timeline: box-move;
}
.mask {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(-75deg, #63E2B7, #1F8F93);
  z-index: 2;
  animation-name: reOpacityChange;
  animation-duration: 1.5s;
  animation-timeline: box-move;
}
.logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(calc(-50% - 2px), calc(-50% - 2px));
  width: 198px;
  height: 282px;
  z-index: 3;
  animation-name: reOpacityChange;
  animation-duration: 1.5s;
  animation-timeline: box-move;
}
@keyframes reOpacityChange {
  0%,
  40% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes scale {
  0%,
  40% {
    transform: scale(1);
  }
  100% {
    transform: scale(3);
  }
}

@keyframes fade-small-larger {
  from {
    opacity: 1;
    transform: scale(1, 1)
  }

  to {
    opacity: 0;
    transform: scale(20, 20)
  }
}

@-webkit-keyframes fade-small-larger {
  from {
    opacity: 1;
    transform: scale(1, 1)
  }

  to {
    opacity: 0;
    transform: scale(20, 20)
  }
}
</style>
