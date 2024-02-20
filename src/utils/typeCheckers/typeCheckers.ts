export function isObject(value: any): value is Record<string, any> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

export function isArray(value: any): value is any[] {
  return Array.isArray(value)
}
