<script lang="ts" setup>
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

/**
 * 将角色 `id` 转换为名称
 */
function transformRoleName(_roleId?: number) {
  return '管理员'
}

/**
 * 格式化时间
 */
function formatDate(date?: Date) {
  return dayJs(date).format('YYYY-MM-DD HH:mm:ss') || '-'
}

function getFileUrl() {
  const avatar = unref(user)?.avatar
  return avatar
    ? {
        url: avatar,
      }
    : undefined
}

const file = ref<any>(getFileUrl())
const avatar = computed(() => {
  return unref(user)?.avatar
})
watch(avatar, () => {
  file.value = getFileUrl()
})

function onChange(_: FileItem[], currentFile: FileItem) {
  file.value = {
    ...currentFile,
  }
  getBase64(unref(file).file).then(async (imageAsDateURL) => {
    // const formData = {
    //   id: unref(user)?.id,
    //   avatar: imageAsDateURL,
    // }
    // const { code } = await UserApi.updateAvatar(formData) as any
    // if (code === 0) {
    Message.success('上传成功')
    userStore.updateAvatar(imageAsDateURL as string)
    // }
    // else {
    //   Message.error('上传失败')
    // }
  })
}

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    let imageAsDateURL = ''
    reader.readAsDataURL(file)
    reader.onload = (data) => {
      const res: any = data.target || data.srcElement
      imageAsDateURL = res.result
    }
    reader.onerror = (err) => {
      reject(err)
    }
    reader.onloadend = () => {
      resolve(imageAsDateURL)
    }
  })
}
</script>

<template>
  <n-card>
    <n-descriptions label-placement="left">
      <n-descriptions-item>
        <template #label>
          <n-h5 prefix="bar" align-text style="margin-bottom: 0;" flex-inline>
            账号
          </n-h5>
        </template>
        <n-tag type="warning">
          {{ user?.username || '-' }}
        </n-tag>
      </n-descriptions-item>
      <n-descriptions-item>
        <template #label>
          <n-h5 prefix="bar" align-text style="margin-bottom: 0;" flex-inline>
            名称
          </n-h5>
        </template>
        <n-tag>
          {{ user?.name || '-' }}
        </n-tag>
      </n-descriptions-item>
      <n-descriptions-item>
        <template #label>
          <n-h5 prefix="bar" align-text style="margin-bottom: 0;" flex-inline>
            手机号码
          </n-h5>
        </template>
        <n-tag>
          {{ user?.phone || '无' }}
        </n-tag>
      </n-descriptions-item>
      <n-descriptions-item>
        <template #label>
          <n-h5 prefix="bar" align-text style="margin-bottom: 0;" flex-inline>
            邮箱
          </n-h5>
        </template>
        <n-tag>
          {{ user?.email || '无' }}
        </n-tag>
      </n-descriptions-item>
      <n-descriptions-item>
        <template #label>
          <n-h5 prefix="bar" align-text style="margin-bottom: 0;" flex-inline>
            角色
          </n-h5>
        </template>
        <n-tag type="info">
          {{ transformRoleName(user?.roleId) }}
        </n-tag>
      </n-descriptions-item>
      <n-descriptions-item>
        <template #label>
          <n-h5 prefix="bar" align-text style="margin-bottom: 0;" flex-inline>
            创建时间
          </n-h5>
        </template>
        <n-tag>
          {{ formatDate(user?.createTime) ?? '-' }}
        </n-tag>
      </n-descriptions-item>
    </n-descriptions>
  </n-card>
</template>

