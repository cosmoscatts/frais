<script  setup lang="ts">
import TheNav from '../components/TheNav.vue'
import TheMain from '../components/TheMain.vue'
import TheFoot from '../components/TheFoot.vue'
</script>

<template>
  <n-layout has-sider h-screen w-screen>
    <n-layout-sider border="1 red">
      海淀桥
    </n-layout-sider>
    <n-layout>
      <n-layout-header>
        <TheNav w-full h-50px bg-transparent />
      </n-layout-header>
      <n-layout-content style="min-height: calc(100% - 100px)">
        <TheMain />
      </n-layout-content>
      <n-layout-footer h-50px>
        <TheFoot />
      </n-layout-footer>
    </n-layout>
  </n-layout>
</template>
