<script setup lang="ts">
defineProps<{
  name?: string
  modelValue: boolean
  disabled?: boolean
}>()
defineEmits(['update:model-value'])
</script>

<template>
  <div flex-y-center justify-between my-3>
    <span>
      {{ name }}
    </span>
    <n-switch
      :round="false"
      :value="modelValue"
      :disabled="disabled"
      @update:value="(value: boolean) => $emit('update:model-value', value)"
    />
  </div>
</template>
