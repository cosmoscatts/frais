<script  setup lang="ts">
import TheNav from '../components/TheNav.vue'
</script>

<template>
  <n-layout h-screen w-screen>
    <n-layout-header>
      <TheNav />
    </n-layout-header>
    <n-layout has-sider>
      <n-layout-sider content-style="padding: 24px;">
        海淀桥
      </n-layout-sider>
      <n-layout-content content-style="padding: 24px;">
        平山道
      </n-layout-content>
    </n-layout>
    <n-layout-footer>成府路</n-layout-footer>
  </n-layout>
</template>
