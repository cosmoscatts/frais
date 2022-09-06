<script setup lang="ts">
import LoginForm from './components/LoginForm.vue'
import BgBanner from '~/assets/bg-banner.svg'
</script>

<template>
  <div hw-screen flex of-hidden>
    <div h-full w="35/100" max-w-600px bg="[var(--primary-color)]" lt-lg:hidden flex-center>
      <div flex="col center" mb-100px>
        <div text-32px font-bold flex-center>
          欢迎使用 Petite
        </div>
        <img :src="BgBanner" w-350px h-350px>
      </div>
    </div>
    <div h-full flex="1 center" bg="[#F5F5F5] dark:[#101014]" lt-lg:w-full lt-md:bg="!white dark:![#101014]">
      <LoginForm
        bg="white dark:[#101014]"
        h-542px w-440px shadow-lg
        dark="border-2 border-neutral-900"
        lt-md="!shadow-none !border-none"
      />
    </div>
  </div>
</template>
