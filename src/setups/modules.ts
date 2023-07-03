import preload from './preload'
import setupAssets from './assets'
import fixStyleConflict from './style-conflict'

export async function setupModules(app: AppContext) {
  const { bool: wait, setFalse } = useBool(true)
  useTimeoutFn(setFalse, 500)
  batchInvoke([setupAssets, fixStyleConflict, preload])
  Object.values(import.meta.glob<{ install: UserModule }>('../modules/*.ts', { eager: true }))
    .forEach(i => i.install?.(app))
  await until(wait).not.toBeTruthy()
  app.mount('#app')
}
