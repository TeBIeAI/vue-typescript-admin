export type ComponentType = 'el-input' | 'el-select'

export enum EventType {
  'el-input' = 'onInput'
}

export interface Emits {
  (e: 'edit-change', newVal?: any, oldVal?: any): void
  (e: 'current-change', num?: number): void
  (e: 'edit-enter', obj: object): void
}

type EmitValidator = (...args: unknown[]) => boolean
export interface ObjectEmitsOptions {
  [key: string]: EmitValidator | null
}
export interface ComponentOptions {
  emits?: ObjectEmitsOptions
}
