import { NAvatar, NEllipsis, NIcon } from 'naive-ui'
import { RouterLink } from 'vue-router'

export function renderIcon(icon: Component) {
  return () => h(NIcon, { class: 'flex-y-center' }, { default: () => h(icon) })
}

export function renderAvatar(avatar: string | ComputedRef<string> | Ref<string>) {
  return () => {
    avatar = unref(avatar) as string
    return h(NAvatar, {
      size: 'small',
      round: true,
      src: avatar,
    })
  }
}

export function renderEllipsis(label = '') {
  return () => h(NEllipsis, null, { default: () => label })
}

export function renderRouterLink(path: string, label = '') {
  return () => h(
    RouterLink,
    { to: { path } },
    { default: () => label },
  )
}
