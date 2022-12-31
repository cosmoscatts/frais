import { APP_META } from '~/config'

export const REGEXP_PHONE
  = /^[1](([3][0-9])|([4][01456789])|([5][012356789])|([6][2567])|([7][0-8])|([8][0-9])|([9][012356789]))[0-9]{8}$/

/**
 * 获取验证码
 */
export const getSmsCode = () => useTimeoutFn(() => $notification.info({
  content: `【${APP_META.name}】验证码：123456，有效期10分钟。如非本人操作，请忽略。`,
  duration: 30 * 1000,
}), 5000)

/**
 * 发送验证码后倒计时功能
 */
export function countSendingSmsCode() {
  const SEND_CODE_BTN_LABEL_DEFAULT = '发送验证码'
  const RETRY_BTN_LABEL = '重新发送'

  const isCounting = ref(false)
  const sendCodeBtnLabel = ref(SEND_CODE_BTN_LABEL_DEFAULT)
  // 倒计时 60 秒
  const COUNT_MAX_NUM = 60
  let maxMs = COUNT_MAX_NUM

  const { resume, pause } = useIntervalFn(() => {
    if (maxMs > 0) { maxMs -= 1 }
    else if (maxMs === 0) {
      isCounting.value = false
      sendCodeBtnLabel.value = RETRY_BTN_LABEL
      pause()
      return
    }
    sendCodeBtnLabel.value = `${maxMs} 秒后重新获取`
  }, 1000, { immediate: false })

  const startCounting = () => {
    isCounting.value = true
    maxMs = COUNT_MAX_NUM
    resume()
  }

  return {
    isCounting,
    sendCodeBtnLabel,
    startCounting,
  }
}
