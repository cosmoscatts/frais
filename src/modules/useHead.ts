import { createHead } from '@vueuse/head'
import type { UserModule } from '~/types'

/**
 * VueUse @Head
 * https://vueuse.org/functions.html#category=%40Head
 */
export const install: UserModule = ({ use }) => {
  use(createHead())
}
