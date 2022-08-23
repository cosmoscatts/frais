import settings from './appSettings'

function makeReactiveSettingVars() {
  return reactive({
    ...settings,
  })
}

export const baseSettingVars = makeReactiveSettingVars()

export * from './appMeta'
