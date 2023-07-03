import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist-uni'

export const install: UserModule = ({ use }) => use(createPinia().use(piniaPluginPersist))
