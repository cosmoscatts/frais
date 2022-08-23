<script setup lang="ts">
import NavBreadCrumb from './nav/NavBreadCrumb.vue'
import NavFullScreen from './nav/NavFullScreen.vue'
import NavHamburger from './nav/NavHamburger.vue'
import NavBell from './nav/NavBell.vue'
import NavAvatar from './nav/NavAvatar.vue'
import Logo from './logo/Logo.vue'
import Menu from './menu/Menu.vue'

// const { appMenus } = storeToRefs(usePermissionStore())
// const mode: 'vertical' | 'horizontal' | 'pop' | 'popButton' = 'horizontal'
const { baseSettings } = storeToRefs(useAppStore())
const isVertical = computed(() => {
  return baseSettings.value?.layout === 'vertical'
})
const { width } = useWindowSize()
let shortLogo = $ref(false)
watchEffect(() => {
  if (!isVertical.value)
    shortLogo = width.value < 1200
})
</script>

<template>
  <div flex justify-between items-center pr-5 shadow="sm light-900 dark:dark-700">
    <Logo v-if="!isVertical" :class="shortLogo ? 'w-64px' : 'w-200px'" />
    <NavHamburger v-if="isVertical" mx-4 />
    <NavBreadCrumb v-if="isVertical" mr-4 />
    <!-- <Menu v-if="!isVertical" :mode="mode" :metadata="appMenus" /> -->
    <div flex-auto />
    <div flex items-center>
      <a
        icon-btn text-lg i-carbon-logo-github mx-4
        href="https://github.com/dud9/petite"
        target="_blank" title="GitHub"
      />
      <NavBell mr-4 />
      <NavFullScreen mr-4 />
      <DarkToggle mr-4 />
      <NavAvatar />
    </div>
  </div>
</template>
