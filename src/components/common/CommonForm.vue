<script setup lang="ts">
import type { FormInst, FormRules } from 'naive-ui'

defineOptions({
  inheritAttrs: true,
})

const { rules = [], style = {} } = defineProps<{
  model: any
  rules?: FormRules
  style?: {}
}>()

const refForm = ref<FormInst>()

defineExpose({
  getRef() {
    return refForm
  },
  validate(fn = () => {}) {
    return refForm.value?.validate(fn)
  },
  restoreValidation() {
    refForm.value?.restoreValidation()
  },
})
</script>

<template>
  <n-form
    ref="refForm"
    :model="model"
    :rules="rules"
    :style="{ maxWidth: '600px', ...style }"
    label-width="auto"
    label-placement="left"
    show-require-mark
    require-mark-placement="right-hanging"
  >
    <slot />
  </n-form>
</template>
