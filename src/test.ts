type A<T> = (x: T) => T

type B = <T>(x: T) => T

const a: A<string> = (x) => x

a('3')

const b: B = (x) => x

b<number>(3)
