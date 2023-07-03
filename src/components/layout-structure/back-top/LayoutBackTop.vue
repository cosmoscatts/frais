<script setup lang="ts">
import { LAYOUT_PARAMS as params } from '~/constants'

defineProps<{ el: Ref<HTMLElement> }>()
</script>

<template>
  <n-back-top
    :listen-to="el"
    :right="params.backTopRight"
    :bottom="params.backTopBottom"
    :visibility-height="params.backTopVisibilityHeight"
  />
</template>
