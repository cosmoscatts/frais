<script setup lang="ts">
import LoginForm from './components/LoginForm.vue'
</script>

<template>
  <div flex="col center" relative hw-screen>
    <LoginForm />
    <div absolute right-5vh top-5vh flex-center op-80>
      <n-button round :focusable="false" @click="toggleDark">
        <div text-lg i="carbon-sun dark:carbon-asleep" />
      </n-button>
    </div>
  </div>
</template>
