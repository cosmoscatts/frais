<script lang="ts" setup>
import type { UploadFileInfo } from 'naive-ui'

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

// function getFileUrl() {
//   const avatar = unref(user)?.avatar
//   return avatar
//     ? {
//         url: avatar,
//       }
//     : undefined
// }

// const file = ref<any>(getFileUrl())
// const avatar = computed(() => {
//   return unref(user)?.avatar
// })
// watch(avatar, () => {
//   file.value = getFileUrl()
// })

// function onChange(_: FileItem[], currentFile: FileItem) {
//   file.value = {
//     ...currentFile,
//   }
//   getBase64(unref(file).file).then(async (imageAsDateURL) => {
//     // const formData = {
//     //   id: unref(user)?.id,
//     //   avatar: imageAsDateURL,
//     // }
//     // const { code } = await UserApi.updateAvatar(formData) as any
//     // if (code === 0) {
//     Message.success('上传成功')
//     userStore.updateAvatar(imageAsDateURL as string)
//     // }
//     // else {
//     //   Message.error('上传失败')
//     // }
//   })
// }

// function getBase64(file: any) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader()
//     let imageAsDateURL = ''
//     reader.readAsDataURL(file)
//     reader.onload = (data) => {
//       const res: any = data.target || data.srcElement
//       imageAsDateURL = res.result
//     }
//     reader.onerror = (err) => {
//       reject(err)
//     }
//     reader.onloadend = () => {
//       resolve(imageAsDateURL)
//     }
//   })
// }

const showModal = ref(false)
const previewImageUrl = ref('')
function handlePreview(file: UploadFileInfo) {
  const { url } = file
  previewImageUrl.value = url as string
  showModal.value = true
}

const previewFileList = ref<UploadFileInfo[]>([
  {
    id: 'react',
    name: '我是react.png',
    status: 'finished',
    url: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
  },
])
</script>

<template>
  <n-card>
    <n-grid x-gap="12" :cols="4" responsive="screen" item-responsive>
      <n-gi span="4 m:1">
        <div flex-center w-full>
          <n-upload
            action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
            :default-file-list="previewFileList"
            list-type="image-card"
            :max="1" :style="{ width: '200px' }"
            @preview="handlePreview"
          />
        </div>
      </n-gi>
      <n-gi span="4 m:3">
        <div flex-y-center hw-full>
          <n-descriptions label-placement="left" w-full lt-md:m="t-5 x-5">
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
        </div>
      </n-gi>
    </n-grid>

    <n-modal
      v-model:show="showModal"
      preset="card"
      style="width: 600px"
      title="一张很酷的图片"
    >
      <img :src="previewImageUrl" style="width: 100%">
    </n-modal>
  </n-card>
</template>

