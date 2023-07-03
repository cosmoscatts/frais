<script setup lang="ts">
onMounted(() => useLottie({
  containerId: '#lottie-container',
  path: 'https://assets6.lottiefiles.com/packages/lf20_BMS5OniP6y.json',
}))
</script>

<template>
  <div hw-screen flex-center text-36px font-bold bg-body>
    <div id="lottie-container" h300px w300px />
  </div>
</template>
