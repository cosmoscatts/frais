import type { UnwrapNestedRefs } from 'vue'

interface Pagination {
  page?: number // 当前页码
  pageSize?: number // 每页条数
  itemCount?: number // 总条数
  showSizePicker?: boolean // 是否显示每页条数
  pageSizes?: number[] // 每页条数
  fetchTableData?: () => void
}

interface ReturnType {
  pagination: Omit<Required<Pagination>, 'fetchTableData'> & {
    onUpdatePage: (page: number) => void
    onUpdatePageSize: (pageSize: number) => void
  }
  createRowNumber: (rowIndex: number) => number
}

export function usePagination({
  page = 1,
  pageSize = 10,
  itemCount = 0,
  showSizePicker = true,
  pageSizes = [10, 20, 50, 100],
  fetchTableData = noop,
}: Pagination): UnwrapNestedRefs<ReturnType> {
  const pagination = reactive({
    page,
    pageSize,
    itemCount,
    showSizePicker,
    pageSizes,
    onUpdatePage: (page: number) => {
      pagination.page = page
      fetchTableData()
    },
    onUpdatePageSize: (pageSize: number) => {
      pagination.pageSize = pageSize
      pagination.page = 1
      fetchTableData()
    },
  })
  return {
    pagination,
    createRowNumber: (rowIndex: number) => {
      const { page, pageSize } = pagination
      return (page - 1) * pageSize + rowIndex + 1
    },
  }
}
