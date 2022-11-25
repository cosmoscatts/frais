import App from './App.vue'
import type { AppContext, UserModule } from './types'

import 'animate.css'
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

function init(app: AppContext) {
  Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
    .forEach(i => i.install?.(app))
  app.mount('#app')
}

// 解决 `tailwind` 的 `preflight` 样式覆盖 `naive` 组件样式的问题
// https://www.naiveui.com/zh-CN/os-theme/docs/style-conflict
const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

init(createApp(App))
