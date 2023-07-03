import type { RouteRecordRaw } from 'vue-router'

interface Module {
  default: RouteRecordRaw | RouteRecordRaw[]
}

const modules = import.meta.glob('./routes/*.ts', { eager: true }) as Record<string, Module>

function formatModules(_modules: Record<string, Module>, result: RouteRecordRaw[]) {
  Object.keys(_modules).forEach((key) => {
    const defaultModule = _modules[key].default
    if (!defaultModule)
      return
    const moduleList = Array.isArray(defaultModule)
      ? [...defaultModule]
      : [defaultModule]
    result.push(...moduleList)
  })
  const notFoundRoute = result.find(i => i.name === 'NotFound')
  if (!notFoundRoute)
    return result
  return [
    ...result.filter(i => i.name !== 'NotFound'),
    notFoundRoute,
  ]
}

const appRoutes: RouteRecordRaw[] = formatModules(modules, [])

export default appRoutes
