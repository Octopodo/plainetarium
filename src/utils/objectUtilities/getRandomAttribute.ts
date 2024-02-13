import { Random } from 'random-js'
import { getPartialObjectWith, getPartialObjectWithout } from '@/utils'
const random = new Random()

export function getRandomAttribute<T extends Object>(obj: T): T[keyof T] {
  return obj[getRandomObjetctKey(obj)]
}

export function getRandomObjetctKey<T extends Object>(obj: T): keyof T {
  const keys = Object.keys(obj)
  const randomKey = random.integer(0, keys.length - 1)
  return keys[randomKey] as keyof T
}

export function getRandomAttributeWith<T extends Object>(
  obj: T,
  keys: string[] | string
): T[keyof T] {
  const partialObj = getPartialObjectWith(obj, keys)
  return getRandomAttribute(partialObj)
}

export function getRandomAttributeWithout<T extends Object>(
  obj: T,
  keys: string[] | string
): T[keyof T] {
  const partialObj = getPartialObjectWithout(obj, keys)
  return getRandomAttribute(partialObj)
}
