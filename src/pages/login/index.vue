<script setup lang="ts">
import LoginWrapper from './components/LoginWrapper.vue'
import BgBanner from '~/assets/bg-banner.svg'
import { appMeta } from '~/config'
</script>

<template>
  <div
    flex
    hw-screen
    of="x-hidden y-auto" lt-sm="!of-hidden"
  >
    <div
      relative
      flex-center
      h-full min-h-650px
      w="35/100" max-w-600px
      bg="[var(--primary-color)]"
      lt-md:hidden
    >
      <div absolute top-20px left-20px i-ri-vip-crown-2-fill text-20px />

      <div flex="col center" mb-50px>
        <div text-32px font-bold flex-center>
          欢迎使用 {{ appMeta.name }}
        </div>
        <p v-if="appMeta.description" text-16px>
          {{ appMeta.description }}
        </p>
        <img :src="BgBanner" w-350px h-350px>
        <p v-if="appMeta.author" text-16px mt-30px>
          By {{ appMeta.author }}
        </p>
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
        dark="border-4 border-neutral-900"
        lt-sm="!shadow-none !border-none"
      />
      <div flex-center absolute left="[1/2]" bottom-20px>
        <DarkToggle />
      </div>
    </div>
  </div>
</template>
