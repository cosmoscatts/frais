<script  setup lang="ts">
import {
  TheFoot,
  TheMain,
  TheNav,
  TheSettings,
  TheSide,
  TheTabs,
} from '../components'
</script>

<template>
  <n-layout has-sider h-screen w-screen>
    <n-layout-sider>
      <TheSide />
    </n-layout-sider>
    <n-layout>
      <n-layout-header>
        <TheNav w-full h-64px bg-transparent />
      </n-layout-header>
      <n-layout-content style="min-height: calc(100% - 114px)">
        <TheMain />
      </n-layout-content>
      <n-layout-footer h-50px>
        <TheFoot />
      </n-layout-footer>
    </n-layout>
  </n-layout>
</template>
