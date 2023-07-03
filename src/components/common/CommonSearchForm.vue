<script setup lang="ts">
import IconSearch from '~icons/carbon/search'
import IconRestart from '~icons/carbon/restart'

const { formModel, search = () => {}, reset = () => {}, show = true } = defineProps<{
  formModel: any
  search?: () => void
  reset?: () => void
  show?: boolean
}>()

const rows = $computed(() => (Math.ceil(Object.keys(formModel).length / 3)))
const spans = computed(() => {
  if (rows > 1)
    return [22, 2]
  return [20, 4]
})
const buttonCols = computed(() => {
  return [2, 1][Number(rows > 1)]
})
</script>

<template>
  <n-collapse-transition :show="show" ha>
    <n-grid :x-gap="18" :y-gap="8" :cols="24">
      <n-gi :span="spans[0]">
        <n-grid :x-gap="12" :y-gap="12" cols="8 s:16 l:24" responsive="screen">
          <slot />
        </n-grid>
      </n-gi>

      <n-gi :span="spans[1]">
        <n-grid :x-gap="12" :y-gap="12" :cols="buttonCols" responsive="screen">
          <n-gi span="1">
            <div flex-y-center justify-end>
              <n-button type="primary" text-color="white" @click="search">
                <template #icon>
                  <n-icon :component="IconSearch" color="white" />
                </template>
                <span font-bold>查询</span>
              </n-button>
            </div>
          </n-gi>
          <n-gi span="1">
            <div flex-y-center justify-end>
              <n-button secondary @click="reset">
                <template #icon>
                  <n-icon :component="IconRestart" />
                </template>
                <span font-bold>重置</span>
              </n-button>
            </div>
          </n-gi>
        </n-grid>
      </n-gi>
    </n-grid>
  </n-collapse-transition>
</template>
