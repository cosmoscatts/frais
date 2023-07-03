<script setup lang="ts">
import LayoutSettingsSelect from './LayoutSettingsSelect.vue'
import LayoutSettingsSwitch from './LayoutSettingsSwitch.vue'
import LayoutSettingsColorPicker from './LayoutSettingsColorPicker.vue'
import LayoutSettingsLayoutMode from './LayoutSettingsLayoutMode.vue'
import {
  type CollapseOption,
  type Option,
  type OptionRenderType,
  funcOptions,
  layoutOptions,
  primaryColorOption,
} from './options'
import IconOpenArmLine from '~icons/ri/open-arm-line'

const defaultExpandedNames = computed(() => {
  return [funcOptions, layoutOptions]
    .flatMap((i: CollapseOption[]) => i.map(j => j.name)) || []
})

const uiStore = useUiStore()

function renderComponent(key: OptionRenderType) {
  return [
    LayoutSettingsLayoutMode,
    LayoutSettingsSelect,
    LayoutSettingsSwitch,
    LayoutSettingsColorPicker,
  ][[
    'layoutRadio',
    'select',
    'switch',
    'colorPicker',
  ].findIndex(i => i === key)]
}

function isDisabled({ dependOn }: Option) { // 判断关联的设置项是否需要禁止点击
  if (!dependOn)
    return false
  // 侧边栏折叠触发器样式需要单独判断
  // 只有垂直布局时，才有侧边栏
  const copy = uiStore.settingsCopy
  return dependOn === 'layout'
    ? ['horizontal', 'vertical-mix'].includes(copy[dependOn])
    : !copy[dependOn]
}

function showDisabledMsg(data: Option[], disabledMsg?: string) {
  if (!disabledMsg)
    return false
  return data.some(i => isDisabled(i))
}
</script>

<template>
  <n-collapse :default-expanded-names="defaultExpandedNames">
    <template #arrow>
      <n-icon>
        <IconOpenArmLine />
      </n-icon>
    </template>

    <n-divider dashed>
      <div flex-y-center text-primary>
        <div i-ri-palette-line mr-2 />
        系统主色调
      </div>
    </n-divider>
    <Component
      :is="renderComponent('colorPicker')"
      v-model:model-value="uiStore.settingsCopy[primaryColorOption.prop]"
    />

    <n-divider dashed>
      <div flex-y-center text-primary>
        <div i-ri-layout-right-line mr-2 />
        页面布局
      </div>
    </n-divider>
    <n-collapse-item
      v-for="{ name, title, data } in layoutOptions"
      :key="name" :title="title" :name="name"
    >
      <div v-for="item, idx in data" :key="idx">
        <Component
          :is="renderComponent(item.type)"
          v-bind="{ ...item }" v-model:model-value="uiStore.settingsCopy[item.prop]"
          :disabled="isDisabled(item)"
        />
      </div>
    </n-collapse-item>

    <n-divider dashed>
      <div flex-y-center text-primary>
        <div i-ri-function-line mr-2 />
        页面功能
      </div>
    </n-divider>
    <n-collapse-item
      v-for="{ name, title, data, disabledMsg } in funcOptions"
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
          v-bind="{ ...item }" v-model:model-value="uiStore.settingsCopy[item.prop]"
          :disabled="isDisabled(item)"
        />
      </div>
    </n-collapse-item>
  </n-collapse>
</template>
