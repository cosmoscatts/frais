<script lang="ts" setup>
import type { UploadFileInfo } from 'naive-ui'

const { message } = useGlobalNaiveApi()

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const { updateUser } = userStore

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

/**
 * 转换图片成 `Base64`
 */
function getBase64(file: File) {
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

// 是否显示头像预览
let showImagePreview = $ref(false)
// 预览头像 `url`
let previewImageUrl = $ref('')

/**
 * 处理头像预览
 */
function handlePreview({ url }: UploadFileInfo) {
  previewImageUrl = url as string
  showImagePreview = true
}

const avatar = computed<UploadFileInfo[]>(() => {
  const { value: _user } = user
  return _user?.avatar
    ? [
        {
          id: 'avatar',
          name: 'avatar',
          url: _user.avatar,
          status: 'finished',
        },
      ]
    : []
})

function onChange({
  file: uploadingFileInfo,
}: {
  file: UploadFileInfo
  fileList: Array<UploadFileInfo>
  event?: Event
}) {
  getBase64(uploadingFileInfo.file!).then(async (imageAsDateURL) => {
    const { value: _user } = user
    updateUser({
      ...JSON.parse(JSON.stringify(_user)),
      avatar: imageAsDateURL as string,
    })
    message.success('上传成功')
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
        <div flex-y-c hfull wfull >
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
      v-model:show="showImagePreview"
      preset="card"
      style="width: 600px"
      title="预览头像"
    >
      <img :src="previewImageUrl" w-full>
    </n-modal>
  </n-card>
</template>

