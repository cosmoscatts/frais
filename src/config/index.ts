import settingVars from './settingVars'

function makeReactiveSettingVars() {
  return reactive({
    ...settingVars,
  })
}

export const baseSettingVars = makeReactiveSettingVars()

export * from './appMeta'
