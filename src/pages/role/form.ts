import type { FormRules, TreeOption } from 'naive-ui'
import { NH4, NIcon, NText } from 'naive-ui'
import { Bookmark as BookmarkIcon, Bookmarks as BookmarksIcon } from '@vicons/ionicons5'

export const rules: FormRules = {
  name: [
    {
      required: true,
      message: '请输入角色名称',
    },
  ],
  description: [
    {
      required: true,
      message: '请输入角色描述',
    },
  ],
  menuIdList: [
    {
      required: true,
      message: '请设置角色菜单权限',
    },
  ],
}

export function renderTreeLabel({
  option: { label, children },
  checked,
}: {
  option: TreeOption
  checked: boolean
  selected: boolean
}) {
  return (children?.length ?? 0) > 0
    ? h(
      NH4,
      {
        prefix: 'bar',
        style: { marginBottom: 0 },
      },
      () => h(
        NText,
        {
          type: checked ? 'primary' : undefined,
        },
        {
          default: () => label,
        },
      ),
    )
    : h(
      'span',
      {
        style: { marginLeft: '12px' },
        class: { 'text-primary': checked },
      },
      {
        default: () => label,
      },
    )
}

export function renderTreePrefix({
  option: { children },
  checked,
}: {
  option: TreeOption
  checked: boolean
  selected: boolean
}) {
  const uiStore = useUiStore()
  const iconComponent = children?.length
    ? BookmarksIcon
    : BookmarkIcon
  return h(
    NIcon,
    {
      color: checked ? uiStore.settings.primaryColor : undefined,
      component: iconComponent,
    },
  )
}
