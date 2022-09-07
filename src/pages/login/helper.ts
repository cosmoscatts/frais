/** 校验手机号 */
export const REGEXP_PHONE
  = /^[1](([3][0-9])|([4][01456789])|([5][012356789])|([6][2567])|([7][0-8])|([8][0-9])|([9][012356789]))[0-9]{8}$/

/**
 * 获取验证码
 */
export function getSmsCode() {
  const { message } = useGlobalNaiveApi()
  useTimeoutFn(() => {
    message.info('验证码为 123456')
  }, 5000)
}

/**
 * 发送验证码后倒计时功能
 */
export function countSendingSmsCode() {
  const SEND_CODE_BTN_LABEL_DEFAULT = '发送验证码'
  const RETRY_BTN_LABEL = '重新发送'

  const isCounting = ref(false)
  const sendCodeBtnLabel = ref(SEND_CODE_BTN_LABEL_DEFAULT)
  // 倒计时 60 秒
  let maxMs = 60

  const endCounting = () => {
    isCounting.value = false
    sendCodeBtnLabel.value = RETRY_BTN_LABEL
  }

  const { resume } = useIntervalFn(() => {
    sendCodeBtnLabel.value = `${maxMs} 秒后重新获取`
    if (maxMs > 0)
      maxMs -= 1
    else if (maxMs === 0)
      endCounting()
  }, 1000, { immediate: false })

  const startCounting = () => {
    isCounting.value = true
    maxMs = 60
    resume()
  }

  return {
    isCounting,
    sendCodeBtnLabel,
    startCounting,
  }
}
