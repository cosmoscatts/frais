<script setup lang="ts">
const toggleDark = useToggleDark
</script>

<template>
  <button
    icon-btn text-lg
    i="carbon-light-filled dark:carbon-asleep-filled"
    @click="toggleDark()"
  />
</template>
