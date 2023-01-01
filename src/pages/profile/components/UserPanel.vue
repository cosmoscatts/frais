<script lang="ts" setup>
import type { UploadFileInfo } from 'naive-ui'

const authStore = useAuthStore()
let showImagePreview = $ref(false)
let previewImageUrl = $ref('')
const avatar = computed<UploadFileInfo[]>(() => authStore.user?.avatar
  ? [
      {
        id: 'avatar',
        name: 'avatar',
        url: authStore.user.avatar,
        status: 'finished',
      },
    ]
  : [])
const transformRoleName = (_roleId?: number) => '管理员'
const handlePreview = ({ url }: UploadFileInfo) => {
  if (!url) return
  previewImageUrl = url
  showImagePreview = true
}
function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    let imageAsDateURL = ''
    reader.readAsDataURL(file)
    reader.onload = data => imageAsDateURL = data.target!.result as string
    reader.onerror = err => reject(err)
    reader.onloadend = () => resolve(imageAsDateURL)
  })
}
function onChange({
  file: uploadingFileInfo,
}: {
  file: UploadFileInfo
  fileList: Array<UploadFileInfo>
  event?: Event
}) {
  getBase64(uploadingFileInfo.file!)
    .then(async (imageAsDateURL) => {
      authStore.updateUser({
        ...G.clone(authStore.user),
        avatar: imageAsDateURL as string,
      })
      $message.success('上传成功')
    })
}
</script>

<template>
  <n-card>
    <n-grid x-gap="12" :cols="4" responsive="screen" item-responsive>
      <n-gi span="4 m:1">
        <div flex-c w-full>
          <n-upload
            :file-list="avatar"
            :default-upload="false"
            list-type="image-card"
            :show-remove-button="false"
            :max="2" :style="{ width: '200px' }"
            @preview="handlePreview"
            @change="onChange"
          />
        </div>
      </n-gi>

      <n-gi span="4 m:3">
        <div flex-y-c hfull wfull>
          <n-descriptions label-placement="left" w-full lt-md:m="t-5 x-5">
            <n-descriptions-item>
              <template #label>
                <n-h5 prefix="bar" align-text style="margin-bottom: 0;" flex-inline>
                  账号
                </n-h5>
              </template>
              <n-tag type="warning">
                {{ authStore.user?.username || '-' }}
              </n-tag>
            </n-descriptions-item>
            <n-descriptions-item>
              <template #label>
                <n-h5 prefix="bar" align-text style="margin-bottom: 0;" flex-inline>
                  名称
                </n-h5>
              </template>
              <n-tag>
                {{ authStore.user?.name || '-' }}
              </n-tag>
            </n-descriptions-item>
            <n-descriptions-item>
              <template #label>
                <n-h5 prefix="bar" align-text style="margin-bottom: 0;" flex-inline>
                  角色
                </n-h5>
              </template>
              <n-tag type="info">
                {{ transformRoleName(authStore.user?.roleId) }}
              </n-tag>
            </n-descriptions-item>
            <n-descriptions-item>
              <template #label>
                <n-h5 prefix="bar" align-text style="margin-bottom: 0;" flex-inline>
                  创建时间
                </n-h5>
              </template>
              <n-tag>
                {{ formatDate(authStore.user?.createTime) ?? '-' }}
              </n-tag>
            </n-descriptions-item>
          </n-descriptions>
        </div>
      </n-gi>
    </n-grid>

    <n-modal
      v-model:show="showImagePreview"
      preset="card"
      style="width: 600px"
      title="预览头像"
    >
      <img :src="previewImageUrl" w-full>
    </n-modal>
  </n-card>
</template>
