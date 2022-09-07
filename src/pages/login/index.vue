<script setup lang="ts">
import LoginWrapper from './components/LoginWrapper.vue'
import BgBanner from '~/assets/bg-banner.svg'
// import { appMeta, debug } from '~/config'
</script>

<template>
  <div
    flex
    hw-screen
    of="x-hidden y-auto" lt-sm="!of-hidden"
  >
    <div
      flex-center
      h-full min-h-650px
      w="35/100" max-w-600px
      bg="[var(--primary-color)]"
      lt-md:hidden
    >
      <div flex="col center" mb-100px>
        <div text-32px font-bold flex-center>
          欢迎使用 Petite
        </div>
        <img :src="BgBanner" w-350px h-350px>
      </div>
    </div>
    <div
      relative
      flex="1 center"
      h-full min-h-650px
      bg="[#F5F5F5] dark:[#121212]"
      lt-sm:w-full
      lt-sm:bg="!white dark:![#121212]"
    >
      <LoginWrapper
        bg="white dark:[#121212]"
        h-542px w-440px shadow-lg
        dark="border-2 border-neutral-900"
        lt-sm="!shadow-none !border-none"
      />
      <div flex-center absolute left="[1/2]" bottom-20px>
        <DarkToggle />
      </div>
    </div>
  </div>
</template>
