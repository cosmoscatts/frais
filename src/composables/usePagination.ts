/**
 * 定义分页通用方法
 */
export function usePagination({
  page = 1,
  pageSize = 10,
  showSizePicker = true,
  pageSizes = [10, 20, 50, 100],
  onChangeCallback,
  onUpdatePageSizeCallback,
}: {
  /** 当前页码 */
  page?: number
  /** 每页条数 */
  pageSize?: number
  /** 是否显示每页条数的选择器 */
  showSizePicker?: boolean
  /** 每页条数选择器选项 */
  pageSizes?: number[]
  /** 改变页码的回调方法 */
  onChangeCallback?: () => void
  /** 每页条数改变的回调方法 */
  onUpdatePageSizeCallback?: () => void
}) {
  const pagination = reactive({
    page,
    pageSize,
    showSizePicker,
    pageSizes,
    onChange: (page: number) => {
      pagination.page = page
      onChangeCallback?.()
    },
    onUpdatePageSize: (pageSize: number) => {
      pagination.pageSize = pageSize
      pagination.page = 1
      onUpdatePageSizeCallback?.()
    },
  })

  return pagination
}
