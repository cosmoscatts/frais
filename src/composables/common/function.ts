/**
 * Call every function in an array
 */
export function batchInvoke(functions: Nullable<Fn>[]) {
  functions.forEach(fn => fn && fn())
}

/**
 * Call the function
 */
export function invoke(fn: Fn) {
  return fn()
}

/**
 * Pass the value through the callback, and return the value
 *
 * @example
 * ```
 * function createUser(name: string): User {
 *   return tap(new User, user => {
 *     user.name = name
 *   })
 * }
 * ```
 */
export function tap<T>(value: T, callback: (value: T) => void): T {
  callback(value)
  return value
}

export function assert(condition: boolean, message: string): asserts condition {
  if (!condition)
    throw new Error(message)
}

export const toString = (v: any) => Object.prototype.toString.call(v)

export function getTypeName(v: any) {
  if (v === null)
    return 'null'
  const type = toString(v).slice(8, -1).toLowerCase()
  return (typeof v === 'object' || typeof v === 'function') ? type : typeof v
}

export function noop() {}
