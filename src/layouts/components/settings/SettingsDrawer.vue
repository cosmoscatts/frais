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

// 判断关联的设置项是否需要禁止点击
const isDisabled = ({ dependOn }: SettingItem) => {
  if (!dependOn)
    return false
  // 侧边栏折叠触发器样式需要单独判断
  // 只有垂直布局时，才有侧边栏
  const { value: stage } = stageSettings
  return dependOn === 'layout'
    ? stage[dependOn] !== 'vertical'
    : !stage[dependOn]
}

// 判断 `collapse-item` 是否显示禁止点击信息
const showDisabledMsg = (data: SettingItem[], disabledMsg?: string) => {
  if (!disabledMsg)
    return false
  return data.some(i => isDisabled(i))
}
</script>

<template>
  <n-collapse :default-expanded-names="defaultExpandedNames">
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
        <Component
          :is="renderComponent(item.type)"
          v-bind="{ ...item }" v-model:model-value="stageSettings[item.prop]"
        />
      </div>
    </n-collapse-item>

    <n-divider>
      系统主色调
    </n-divider>
    <Component
      :is="renderComponent('colorPicker')" v-bind="primaryColorSetting"
      v-model:model-value="stageSettings[primaryColorSetting.prop]"
    />

    <n-divider>
      页面功能
    </n-divider>
    <n-collapse-item
      v-for="{ name, title, data, disabledMsg } in funcSettings"
      :key="name" :title="title" :name="name"
    >
      <template v-if="showDisabledMsg(data, disabledMsg)" #header-extra>
        <n-text type="error">
          {{ disabledMsg }}
        </n-text>
      </template>
      <div v-for="item, idx in data" :key="idx">
        <Component
          :is="renderComponent(item.type)"
          v-bind="{ ...item }" v-model:model-value="stageSettings[item.prop]"
          :disabled="isDisabled(item)"
        />
      </div>
    </n-collapse-item>
  </n-collapse>
</template>

