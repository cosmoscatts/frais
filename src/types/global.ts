import type { App } from 'vue'
export type UserModule = (app: App) => void
export type { App as AppContext }

export interface AnyObject {
  [key: string]: unknown
}

export interface Result<T> {
  code: number
  data: T
  message?: string
}

export interface PageData<T> {
  [key: string]: any
  records: T[]
  total: number
}

type T = AnyObject | AnyObject[]

export interface HttpParams extends AnyObject {
  params?: T
}

export interface GetParams extends HttpParams {}

export interface PostParams extends HttpParams {
  body?: T
}

export interface PutParams extends HttpParams {
  body?: T
}

export interface DeleteParams extends HttpParams {}