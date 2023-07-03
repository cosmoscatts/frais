// https://www.naiveui.com/zh-CN/os-theme/docs/style-conflict
export default function fixStyleConflict() {
  const meta = document.createElement('meta')
  meta.name = 'naive-ui-style'
  document.head.appendChild(meta)
}
