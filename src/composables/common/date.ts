import dayjs from 'dayjs'

const DEFAULT_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export function formatDate(date?: dayjs.ConfigType, opts: {
  format?: string
  defaultReturn?: string
  enableDefaultDate?: boolean
} = {}): string {
  if (!opts.format)
    opts.format = DEFAULT_FORMAT
  if (!opts.enableDefaultDate && !date)
    return opts.defaultReturn ?? ''
  return dayjs(date).format(opts.format)
}

export function formatDay(date?: dayjs.ConfigType, defaultReturn = '') {
  return formatDate(date, {
    format: 'YYYY-MM-DD',
    defaultReturn,
  })
}

export function formatNow(format = DEFAULT_FORMAT) {
  return formatDate(dayjs(), {
    format,
  })
}

/**
 * 获取近期随机日期时间
 */
export function getRandomDateStr(format?: string, range = 2): string {
  const now = dayjs()
  const millisecond = now.valueOf() - now.subtract(range, 'year').valueOf()
  const date = now.subtract(getRandomInteger(millisecond), 'millisecond')
  return formatDate(date, { format })
}
