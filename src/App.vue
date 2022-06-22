<script setup lang="ts">

</script>

<template>
  <h1>Hello, World!</h1>
  <n-layout has-sider>
    <n-layout-sider
      collapse-mode="transform"
      :collapsed-width="120"
      :width="240"
      show-trigger="bar"
      content-style="padding: 24px;"
      bordered
    >
      <n-h2>海淀桥</n-h2>
    </n-layout-sider>
    <n-layout-content content-style="padding: 24px;">
      平山道
    </n-layout-content>
  </n-layout>
</template>

