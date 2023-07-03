export {}
declare global {
  type Mutable<T> = {
    -readonly[P in keyof T]: T[P]
  }

  /**
   * 用 O 中的属性替换 T 中的属性
   */
  type Overwrite<T, O> = Omit<T, keyof O> & O

  /**
   * 将 T 中属于 K 的属性变为不为空
   */
  type MarkNonNullable<T, K extends keyof T> = Overwrite<T, {
    [P in K]-?: NonNullable<T[P]>
  }>

  /**
   * Promise, or maybe not
   */
  type Awaitable<T> = T | PromiseLike<T>

  /**
   * Null or whatever
   */
  type Nullable<T> = T | null | undefined

  /**
   * Array, or not yet
   */
  type Arrayable<T> = T | Array<T>

  /**
   * Function
   */
  type Fn<T = void> = () => T

  /**
   * Constructor
   */
  type Constructor<T = void> = new (...args: any[]) => T

  /**
   * Infers the element type of an array
   */
  type ElementOf<T> = T extends (infer E)[] ? E : never

  /**
   * Defines an intersection type of all union items.
   *
   * @param U Union of any types that will be intersected.
   * @returns U items intersected
   * @see https://stackoverflow.com/a/50375286/9259330
   */
  type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never

  /**
   * Infers the arguments type of a function
   */
  type ArgumentsType<T> = T extends ((...args: infer A) => any) ? A : never

  type MergeInsertions<T> =
    T extends object
      ? { [K in keyof T]: MergeInsertions<T[K]> }
      : T

  type DeepMerge<F, S> = MergeInsertions<{
    [K in keyof F | keyof S]: K extends keyof S & keyof F
      ? DeepMerge<F[K], S[K]>
      : K extends keyof S
        ? S[K]
        : K extends keyof F
          ? F[K]
          : never;
  }>
}
