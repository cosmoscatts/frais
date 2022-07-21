import { createHead } from '@vueuse/head'

export function install(app: any) {
  app.use(createHead())
}
