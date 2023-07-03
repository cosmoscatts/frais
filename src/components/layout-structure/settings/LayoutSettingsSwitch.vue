<script setup lang="ts">
defineProps<{
  name?: string
  disabled?: boolean
}>()
const { modelValue } = defineModels<{ modelValue: boolean }>()
</script>

<template>
  <div my-3 flex-y-center justify-between>
    <span>
      {{ name }}
    </span>
    <n-switch
      :round="false"
      :value="modelValue"
      :disabled="disabled"
      @update:value="(value: boolean) => modelValue = value"
    />
  </div>
</template>
