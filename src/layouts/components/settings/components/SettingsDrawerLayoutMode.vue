<script setup lang="ts">
const {
  modelValue = 'vertical',
  options = [],
} = defineProps<{
  modelValue: 'vertical' | 'horizontal'
  options: {
    label: string
    value: string
  }[]
}>()

const emits = defineEmits(['update:model-value'])

// 验证是否选中
const isChecked = (value: string) => (value === modelValue)

// 生成 `layout - icon` 的样式
const layoutIconClass: Record<string, {
  menuClass: string
  mainClass: string
}> = {
  vertical: {
    menuClass: 'w-1/3 h-full',
    mainClass: 'w-2/3 h-3/4',
  },
  horizontal: {
    menuClass: 'w-full h-1/4',
    mainClass: 'w-full h-3/4',
  },
}

const renderLayoutIcon = (value: string) => {
  return layoutIconClass[value]
}

function onClick(value: string) {
  emits('update:model-value', value)
}
</script>

<template>
  <div flex-y-center justify-between h-100px>
    <div
      v-for="{ label, value }, idx in options" :key="idx"
      class="border-2px rounded-6px cursor-pointer hover:border-primary"
      :class="[isChecked(value) ? 'border-primary' : 'border-transparent']"
      @click="onClick(value)"
    >
      <n-tooltip placement="bottom" trigger="hover">
        <template #trigger>
          <div relative w-140px h-80px bg="white dark:[#18181C]" rounded-4px of-hidden>
            <div class="absolute left-0 top-0 bg-[#273352] dark:bg-[#18181C]" :class="renderLayoutIcon(value)?.menuClass" />
            <div class="absolute right-0 bottom-0 bg-[#f0f2f5] dark:bg-[#101014]" :class="renderLayoutIcon(value)?.mainClass" />
          </div>
        </template>
        <span>{{ label }}</span>
      </n-tooltip>
    </div>
  </div>
</template>
