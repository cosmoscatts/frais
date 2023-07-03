export function clone<T = any>(data: T): T {
  return JSON.parse(JSON.stringify(data)) as T
}

export function deepClone<T = any>(obj: T): T {
  return lodash.cloneDeep<T>(obj)
}

/**
 * 将 source 中属于 target 中属性的值赋给 target
 */
export function assignObj<S extends object, T extends object>(
  source: S,
  target: T,
): void {
  Object.entries(source).forEach(([key, value]) => {
    if (Object.prototype.hasOwnProperty.call(target, key))
      target[key as keyof T] = value
  })
}
