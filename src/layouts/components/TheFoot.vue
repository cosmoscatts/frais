<script setup lang="ts">
import { APP_META } from '~/config'

const { footCopyRight } = APP_META
</script>

<template>
  <div flex-center font-bold text-14px>
    {{ footCopyRight }}
  </div>
</template>
