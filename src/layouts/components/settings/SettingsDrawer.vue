<script setup lang="ts">
import { CashOutline as CashIcon } from '@vicons/ionicons5'
import type { Component } from 'vue'
import {
  SettingsDrawerColorPicker,
  SettingsDrawerLayoutMode,
  SettingsDrawerSelectItem,
  SettingsDrawerSwitchItem,
} from './components'
import {
  type CollapseItem,
  type SettingItem,
  type SettingItemRenderType,
  funcSettings,
  layoutSettings,
  primaryColorSetting,
} from './helper'

const defaultExpandedNames = computed(() => {
  return [funcSettings, layoutSettings]
    .flatMap((i: CollapseItem[]) => i.map(j => j.name)) || []
})

const appStore = useAppStore()
const { stageSettings } = storeToRefs(appStore)

function renderComponent(key: SettingItemRenderType) {
  const componentMap: Record<SettingItemRenderType, Component> = {
    layoutRadio: SettingsDrawerLayoutMode,
    select: SettingsDrawerSelectItem,
    switch: SettingsDrawerSwitchItem,
    colorPicker: SettingsDrawerColorPicker,
  }
  return componentMap[key]
}
</script>

<template>
  <n-collapse :default-expanded-names="defaultExpandedNames">
    <template #header-extra>
      <n-icon><CashIcon /></n-icon>
    </template>
    <template #arrow>
      <n-icon>
        <CashIcon />
      </n-icon>
    </template>
    <n-divider>
      页面布局
    </n-divider>
    <n-collapse-item
      v-for="{ name, title, data } in layoutSettings"
      :key="name" :title="title" :name="name"
    >
      <div v-for="item, idx in data" :key="idx">
        {{ item.name }}
      </div>
    </n-collapse-item>

    <n-divider>
      系统主色调
    </n-divider>
    <Componet :is="renderComponent('colorPicker')" />

    <n-divider>
      页面功能
    </n-divider>
    <n-collapse-item
      v-for="{ name, title, data } in funcSettings"
      :key="name" :title="title" :name="name"
    >
      <div v-for="item, idx in data" :key="idx">
        {{ item.name }}
      </div>
    </n-collapse-item>
  </n-collapse>
</template>

