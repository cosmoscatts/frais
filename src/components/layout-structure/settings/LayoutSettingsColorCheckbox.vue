<script setup lang="ts">
const {
  color,
  checked = false,
  iconClass = 'text-14px',
} = defineProps<{
  color: string
  checked: boolean
  iconClass?: string
}>()

const whiteColors = ['#ffffff', '#fff', 'rgb(255,255,255)']
const isWhite = computed(() => whiteColors.includes(color))
</script>

<template>
  <div h20px w20px flex-center cursor-pointer rounded-2px shadow :style="{ backgroundColor: color }">
    <div
      v-if="checked" i-carbon-checkmark
      :class="[iconClass, isWhite ? 'text-gray-700' : 'text-white']"
    />
  </div>
</template>
