<script setup lang="ts">
defineProps<{
  name?: string
  options: {
    label: string
    value: string
  }[]
  disabled?: boolean
}>()
const { modelValue } = defineModels<{ modelValue: string }>()
</script>

<template>
  <div my-3 flex-y-center justify-between>
    <span>
      {{ name }}
    </span>
    <n-select
      :style="{ width: '120px' }"
      :placeholder="name"
      :value="modelValue"
      :options="options"
      :disabled="disabled"
      @update:value="(value: string) => modelValue = value"
    />
  </div>
</template>
