import App from './App.vue'
import type { AppContext, UserModule } from '~/types'

import '~/styles/global.less'
import 'animate.css'
import '@unocss/reset/tailwind.css'
import 'uno.css'

// https://www.naiveui.com/zh-CN/os-theme/docs/style-conflict
const fixStyleConflict = () => {
  const meta = document.createElement('meta')
  meta.name = 'naive-ui-style'
  document.head.appendChild(meta)
}
const setupModules = (app: AppContext) => {
  fixStyleConflict()
  Object.values(import.meta.glob<{ install: UserModule }>('~/modules/*.ts', { eager: true }))
    .forEach(i => i.install?.(app))
  app.mount('#app')
}

setupModules(createApp(App))
