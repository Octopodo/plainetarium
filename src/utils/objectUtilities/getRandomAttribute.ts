import { Random } from 'random-js'
const random = new Random()

export function getRandomAttribute<T extends Object>(obj: T): T[keyof T] {
  return obj[getRandomObjetctKey(obj)]
}

export function getRandomObjetctKey<T extends Object>(obj: T): keyof T {
  const keys = Object.keys(obj)
  const randomKey = random.integer(0, keys.length - 1)
  return randomKey as keyof T
}
