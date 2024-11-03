export function toCamelCase(str: string): string {
  return str.replace(/[-\s]([a-z])/g, (g) => g[1].toUpperCase())
}
export function toKebabCase(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

export function fromCamelCaseToSpaces(str: string): string {
  return str.replace(/([A-Z])/g, ' $1')
}
