<script setup lang="ts">
import LoginWrapper from './components/LoginWrapper.vue'
import BgBanner from '~/assets/bg-banner.png'
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
      <div absolute top-20px left-20px i-carbon-rocket text-20px />

      <div flex="col center" mb-100px>
        <div text-32px font-bold flex-center>
          欢迎使用 {{ appMeta.name }}
        </div>
        <p v-if="appMeta.description" text-16px>
          {{ appMeta.description }}
        </p>
        <img :src="BgBanner" w-300px mt-30px>
      </div>

      <p v-if="appMeta.author" absolute bottom-20px left="[1/2]" text-24px mt-50px>
        {{ appMeta.author }} 🧑🏻‍💻
      </p>
    </div>
    <div
      relative
      flex="1 center"
      h-full min-h-650px
      bg="[#F5F5F5] dark:[#121212]"
      lt-sm:w-full
      lt-sm:bg="!white dark:![#2a2a2b]"
    >
      <LoginWrapper
        bg="white dark:[#2a2a2b]"
        h-542px w-440px class="wrapper-shadow"
        dark="border-1 border-neutral-600 !shadow-none"
        lt-sm="!shadow-none !border-none"
      />
      <div flex-center absolute left="[1/2]" bottom-20px>
        <DarkToggle />
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper-shadow {
  box-shadow: 0 0 20px 5px rgba(40, 40, 40, 0.3);
}
</style>
