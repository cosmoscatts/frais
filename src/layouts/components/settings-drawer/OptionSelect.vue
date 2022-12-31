<script setup lang="ts">
defineProps<{
  name?: string
  modelValue: string
  options: {
    label: string
    value: string
  }[]
  disabled?: boolean
}>()
defineEmits(['update:model-value'])
</script>

<template>
  <div flex-y-center justify-between my-3>
    <span>
      {{ name }}
    </span>
    <n-select
      style="width: 120px"
      :placeholder="name"
      :value="modelValue"
      :options="options"
      :disabled="disabled"
      @update:value="(value: string) => $emit('update:model-value', value)"
    />
  </div>
</template>
