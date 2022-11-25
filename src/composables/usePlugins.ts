/// ///// 常用第三方插件 ////////
// 添加新插件时，请在这里标注，方便查看
// - dayJs
// - echarts
// - lottie-web
/// ///// END ////////

import dayJs from 'dayjs'
import * as echarts from 'echarts'
import lottie from 'lottie-web'
import type { RendererType } from 'lottie-web'

export {
  dayJs,
  echarts,
}

export function useLottie({
  container,
  path,
  loop = true,
  renderer = 'svg',
}: {
  container: Element
  path: string
  loop?: boolean
  renderer?: RendererType
}) {
  lottie.loadAnimation({
    container,
    path,
    loop,
    renderer,
  })
}

