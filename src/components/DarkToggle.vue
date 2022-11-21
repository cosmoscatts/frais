<script setup lang="ts">
const toggleDark = useToggleDark
</script>

<template>
  <button
    icon-btn text-lg
    i="carbon-moon dark:carbon-sun"
    @click="toggleDark()"
  />
</template>
