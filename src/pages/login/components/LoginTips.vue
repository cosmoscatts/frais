<script setup lang="ts">
const defaultData = {
  username: 'admin',
  password: '123456',
}
</script>

<template>
  <div fixed bottom-5 left-0 w-full flex-center lt-lg:hidden>
    <div grid="~ cols-2 gap-2" border="1px solid base-border" p-15px>
      <div col-span-1 font-bold>
        账号：
      </div>
      <div col-span-1>
        {{ defaultData.username }}
      </div>
      <div col-span-1 font-bold>
        密码:
      </div>
      <div col-span-1>
        {{ defaultData.password }}
      </div>
    </div>
  </div>
</template>
