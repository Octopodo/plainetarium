function filterAttributes(
  obj: { [key: string]: any },
  keys: string[] | string
): { [key: string]: any } {
  keys = Array.isArray(keys) ? keys : [keys]
  const newObj: { [key: string]: any } = {}
  for (const key of keys) {
    if (key in obj) {
      newObj[key] = obj[key]
    }
  }
  return newObj
}

export function getPartialObjectWith(
  obj: { [key: string]: any },
  keys: string[] | string
): { [key: string]: any } {
  return filterAttributes(obj, keys)
}

export function getPartialObjectWithout(
  obj: { [key: string]: any },
  keys: string[] | string
): { [key: string]: any } {
  keys = Array.isArray(keys) ? keys : [keys]
  const allKeys = Object.keys(obj)
  const keysToKeep = allKeys.filter((key) => !keys.includes(key))
  return filterAttributes(obj, keysToKeep)
}
