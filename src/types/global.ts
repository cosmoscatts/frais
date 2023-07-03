import type { App } from 'vue'

export {}

type T = AnyObject | AnyObject[] | any

declare global {
  type UserModule = (app: App) => void

  type AppContext = App

  interface Window {
    $loadingBar?: import('naive-ui').LoadingBarProviderInst
    $dialog?: import('naive-ui').DialogProviderInst
    $message?: import('naive-ui').MessageProviderInst
    $notification?: import('naive-ui').NotificationProviderInst
  }

  interface AnyObject {
    [key: string]: unknown
  }

  interface Result<T = any> {
    code: number
    data: T
    message?: string
  }

  interface PageData<T = any> {
    [key: string]: unknown
    records: T[]
    total: number
  }

  interface Pagination {
    current: number
    pageSize: number
    total?: number
  }

  type GeneratePageResult<T> = Result<PageData<T>>

  interface HttpParams extends AnyObject {
    params?: T
  }

  interface GetParams extends HttpParams {}

  interface PostParams extends HttpParams {
    body?: T
  }

  interface PutParams extends HttpParams {
    body?: T
  }

  interface DeleteParams extends HttpParams {}

  interface ModifyBase {
    createTime?: string
    createBy?: number
    updateBy?: number
    updateTime?: string
  }
}
