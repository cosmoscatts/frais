<script setup lang="ts">
import { TabItem } from './tab'
</script>

<template>
  <div ref="refWrapper" of-hidden mx-1rem style="width: calc(100% - 2rem);">
    <ScrollWrapper ref="refScroll" :options="{ scrollX: true, scrollY: false, click: true }">
      <div ref="refTag" h-full :class="[tagButtonShape === 'default' ? 'flex !items-center gap-x-2 mt-1px' : 'flex items-end pr-7']">
        <div
          v-for="{ title, path }, idx in tags" :key="idx"
          h-26px lh-26px wa flex-inline items-center cursor-pointer
          :class="{ 'ha max-h-full': tagButtonShape !== 'default' }"
        >
          <TabItem />
        </div>
      </div>
    </ScrollWrapper>
  </div>
</template>
