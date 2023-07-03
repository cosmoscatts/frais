<script setup lang="ts">
import { APP_META as meta, LAYOUT_PARAMS as params } from '~/constants'

const show = ref(false)
</script>

<template>
  <button i-carbon-menu text-lg icon-btn @click="show = !show" />

  <n-drawer v-model:show="show" :width="params.sideWidth">
    <n-drawer-content closable :native-scrollbar="false" :title="meta.name">
      <div flex="center col">
        <LayoutNavDropdown />
        <div mt10px h50px flex-center>
          <LayoutNavGithub mr4 />
          <LayoutNavFullscreen mr4 />
          <LayoutNavDarkToggle />
        </div>
      </div>

      <LayoutMenu
        mode="vertical"
        no-collapse
        hw-full of-y-auto
        :style="{ height: 'calc(100vh - 130px)' }"
      />
    </n-drawer-content>
  </n-drawer>
</template>
