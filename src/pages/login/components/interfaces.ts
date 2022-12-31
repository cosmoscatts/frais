export type TabValue = 'account' | 'phone'

export interface AccountForm {
  username?: string
  password?: string
}

export interface PhoneForm {
  phone?: string
  code?: string
}
