export function filterAttributes(
  obj: { [key: string]: any },
  keys: string[]
): { [key: string]: any } {
  const newObj: { [key: string]: any } = {}
  for (const key of keys) {
    if (key in obj) {
      newObj[key] = obj[key]
    }
  }
  return newObj
}
