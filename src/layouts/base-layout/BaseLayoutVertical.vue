<script  setup lang="ts">
import TheNav from '../components/TheNav.vue'
</script>

<template>
  <n-layout h-screen w-screen>
    <n-layout has-sider>
      <n-layout-sider>
        海淀桥
      </n-layout-sider>
      <n-layout-content>
        <n-layout-header>
          <TheNav w-full h-50px bg-transparent />
        </n-layout-header>
        content
      </n-layout-content>
    </n-layout>
    <n-layout-footer>成府路</n-layout-footer>
  </n-layout>
</template>
