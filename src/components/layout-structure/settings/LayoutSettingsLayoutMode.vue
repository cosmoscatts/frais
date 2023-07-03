<script setup lang="ts">
const { options } = defineProps<{ options: { label: string; value: string }[] }>()
const { modelValue } = defineModels<{ modelValue: string }>()
const isChecked = (value: string) => (value === modelValue.value)
const layoutCardShadow = computed(() => {
  return ['0 1px 2.5px rgba(0, 0, 0, 0.18)', '0 1px 2.5px rgba(255, 255, 255, 0.18)'][Number(isDark.value)]
})
</script>

<template>
  <div grid="~ cols-2" h180px>
    <div v-for="{ label, value }, idx in options" :key="idx" col-span-1 flex-center>
      <div
        cursor-pointer border-2px rd-6px hover:border-primary
        :class="[isChecked(value) ? 'border-primary' : 'border-transparent']"
        @click="modelValue = value"
      >
        <n-popover trigger="hover" placement="bottom">
          <template #trigger>
            <div
              class="layout-card__shadow h64px w96px gap6px rd-4px p6px"
              :class="[value.includes('vertical') ? 'flex' : 'flex flex-col']"
            >
              <template v-if="value === 'vertical'">
                <div h-full w18px rd-4px bg-primary op-50 />
                <div flex="~ 1 col" gap6px>
                  <div h16px rd-4px bg-primary />
                  <div flex-1 rd-4px bg-primary op-25 />
                </div>
              </template>
              <template v-if="value === 'vertical-mix'">
                <div h-full w8px rd-4px bg-primary op50 />
                <div h-full w16px rd-4px bg-primary op-50 />
                <div flex="~ 1 col" gap6px>
                  <div h16px rd-4px bg-primary />
                  <div flex-1 rd-4px bg-primary op-25 />
                </div>
              </template>
              <template v-if="value === 'horizontal'">
                <div h16px rd-4px bg-primary />
                <div flex="~ 1" gap6px>
                  <div flex-1 rd-4px bg-primary op-25 />
                </div>
              </template>
              <template v-if="value === 'horizontal-mix'">
                <div h16px rd-4px bg-primary />
                <div flex="~ 1" gap6px>
                  <div w18px rd-4px bg-primary op-50 />
                  <div flex-1 rd-4px bg-primary op-25 />
                </div>
              </template>
            </div>
          </template>
          {{ label }}
        </n-popover>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout-card__shadow {
  box-shadow: v-bind(layoutCardShadow);
}
</style>
