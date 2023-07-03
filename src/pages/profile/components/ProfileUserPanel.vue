<script lang="ts" setup>
import type { UploadFileInfo } from 'naive-ui'
import IconUpload from '~icons/carbon/upload'
import IconView from '~icons/carbon/view'

const message = useMessage()

const authStore = useAuthStore()

const avatar = computed(() => authStore.user?.avatar)
const transformRoleName = (_roleId?: number) => '管理员'

let showPreview = $ref(false)
let previewUrl = $ref('')
function onPreview() {
  if (!avatar.value)
    return
  previewUrl = avatar.value
  showPreview = true
}

function onChange({ file }: { file: UploadFileInfo }) {
  useBase64(file.file as File).promise.value.then((base64) => {
    authStore.updateAvatar(base64)
    message.success('上传成功')
  })
}

const refMask = ref()
const isHover = useElementHover(refMask)
</script>

<template>
  <n-card>
    <n-grid x-gap="12" :cols="9" responsive="screen" item-responsive>
      <n-gi span="0 m:0 l:2" mr-30px>
        <n-alert title="注意事项" type="warning">
          密码等关键信息，请谨慎修改！
        </n-alert>
      </n-gi>

      <n-gi span="4 m:1 l:1">
        <div w-full flex-y-center>
          <div ref="refMask" relative h-80px w-80px>
            <n-avatar :src="avatar" :size="80" bordered />
            <div v-show="isHover" absolute bg="[#FAFAFC] dark:[#48484E]" left-0 top-0 z-100 hw-full flex-center op-50>
              <n-upload
                abstract
                :default-upload="false"
                @change="onChange"
              >
                <div flex-center gap-5>
                  <n-upload-trigger #="{ handleClick }" abstract>
                    <n-popover>
                      <template #trigger>
                        <n-button text @click="handleClick">
                          <n-icon size="18">
                            <IconUpload />
                          </n-icon>
                        </n-button>
                      </template>
                      上传
                    </n-popover>
                  </n-upload-trigger>

                  <n-popover>
                    <template #trigger>
                      <n-button text @click="onPreview">
                        <n-icon :size="18">
                          <IconView />
                        </n-icon>
                      </n-button>
                    </template>
                    预览
                  </n-popover>
                </div>
              </n-upload>
            </div>
          </div>
        </div>
      </n-gi>

      <n-gi span="9 md:6 l:6">
        <div ml--20px hw-full flex-y-center>
          <n-descriptions label-placement="left" w-full lt-md:m="t-8 x-8">
            <n-descriptions-item>
              <template #label>
                <n-h5 prefix="bar" align-text :style="{ marginBottom: 0 }" flex-inline>
                  账号
                </n-h5>
              </template>
              <n-tag>
                {{ authStore.user?.username }}
              </n-tag>
            </n-descriptions-item>
            <n-descriptions-item>
              <template #label>
                <n-h5 prefix="bar" align-text :style="{ marginBottom: 0 }" flex-inline>
                  名称
                </n-h5>
              </template>
              <n-tag>
                {{ authStore.user?.name }}
              </n-tag>
            </n-descriptions-item>
            <n-descriptions-item>
              <template #label>
                <n-h5 prefix="bar" align-text :style="{ marginBottom: 0 }" flex-inline>
                  角色
                </n-h5>
              </template>
              <n-tag>
                {{ transformRoleName(authStore.user?.roleId) }}
              </n-tag>
            </n-descriptions-item>
            <n-descriptions-item>
              <template #label>
                <n-h5 prefix="bar" align-text :style="{ marginBottom: 0 }" flex-inline>
                  创建时间
                </n-h5>
              </template>
              <n-tag>
                {{ formatDate(authStore.user?.createTime) }}
              </n-tag>
            </n-descriptions-item>
          </n-descriptions>
        </div>
      </n-gi>
    </n-grid>

    <n-modal
      v-model:show="showPreview"
      :style="{ width: '600px' }"
      title="预览头像" preset="card"
    >
      <img :src="previewUrl" w-full>
    </n-modal>
  </n-card>
</template>
