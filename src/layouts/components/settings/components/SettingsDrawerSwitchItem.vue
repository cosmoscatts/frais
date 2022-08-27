<script setup lang="ts">
const {
  name = '',
  modelValue = true,
  disabled = false,
} = defineProps<{
  name?: string
  modelValue: boolean
  disabled?: boolean
}>()

const emits = defineEmits(['update:model-value'])

function onUpdateValue(value: boolean) {
  emits('update:model-value', value)
}
</script>

<template>
  <div flex-y-center justify-between my-3>
    <span>
      {{ name }}
    </span>
    <n-switch
      :round="false"
      :value="modelValue"
      :on-update:value="onUpdateValue"
      :disabled="disabled"
    />
  </div>
</template>
