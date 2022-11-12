// /**
//  * 判断不为空和undefined
//  * @param value 任意值
//  * @returns boolean
//  */
// export function isTruthy(value: any): boolean {
//   return value !== null && value !== undefined
// }
// 存一下，减少对象属性的读取
const toString = Object.prototype.toString

export function is(value: unknown, type: string) {
  return toString.call(value) === `[object ${type}]`
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}

// 数组可以使用原生的方法获得更高的效率
export function isArray(value: unknown): value is any[] {
  return Array.isArray(value)
}

// 插播一个 function
export function isFunction(value: unknown): value is (...any: any[]) => any {
  return typeof value === 'function'
}

export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean'
}

// 严格判断 true
export function isTrue(value: unknown): value is true {
  return value === true
}

// 严格判断 false
export function isFalse(value: unknown): value is false {
  return value === false
}

// 别忘了 Symbol
export function isSymbol(value: unknown): value is symbol {
  return typeof value === 'symbol'
}

// 这里可以思考对象类型的收窄，用 Record<string, any> 是否合适？
export function isObject<T extends Record<string, any> = Record<string, any>>(
  value: unknown
): value is T {
  return is(value, 'Object')
}

export function isEmpty(value: unknown) {
  if (Array.isArray(value) || typeof value === 'string') {
    return value.length === 0
  }

  if (value instanceof Map || value instanceof Set) {
    return value.size === 0
  }

  if (isObject(value)) {
    return Object.keys(value).length === 0
  }

  return false
}
