<script setup lang="ts">
import { CashOutline as CashIcon } from '@vicons/ionicons5'
import ColorPicker from './ColorPicker.vue'
import OptionLayoutMode from './OptionLayoutMode.vue'
import OptionSelect from './OptionSelect.vue'
import OptionSwitch from './OptionSwitch.vue'
import {
  type CollapseOption,
  type Option,
  type OptionRenderType,
  funcOptions,
  layoutOptions,
  primaryColorOption,
} from './options'

const defaultExpandedNames = computed(() => {
  return [funcOptions, layoutOptions]
    .flatMap((i: CollapseOption[]) => i.map(j => j.name)) || []
})

const uiStore = useUiStore()

function renderComponent(key: OptionRenderType) {
  return [
    OptionLayoutMode,
    OptionSelect,
    OptionSwitch,
    ColorPicker,
  ][[
    'layoutRadio',
    'select',
    'switch',
    'colorPicker',
  ].findIndex(i => i === key)]
}

function isDisabled({ dependOn }: Option) { // 判断关联的设置项是否需要禁止点击
  if (!dependOn) return false
  // 侧边栏折叠触发器样式需要单独判断
  // 只有垂直布局时，才有侧边栏
  const copy = uiStore.settingsCopy
  return dependOn === 'layout'
    ? copy[dependOn] !== 'vertical'
    : !copy[dependOn]
}

function showDisabledMsg(data: Option[], disabledMsg?: string) {
  if (!disabledMsg) return false
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
      v-for="{ name, title, data } in layoutOptions"
      :key="name" :title="title" :name="name"
    >
      <div v-for="item, idx in data" :key="idx">
        <Component
          :is="renderComponent(item.type)"
          v-bind="{ ...item }" v-model:model-value="uiStore.settingsCopy[item.prop]"
        />
      </div>
    </n-collapse-item>

    <n-divider>
      系统主色调
    </n-divider>
    <Component
      :is="renderComponent('colorPicker')"
      v-model:model-value="uiStore.settingsCopy[primaryColorOption.prop]"
    />

    <n-divider>
      页面功能
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
