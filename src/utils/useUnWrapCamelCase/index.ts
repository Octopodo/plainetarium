export function unWrapCamelCase(key: string): string {
  // Inserts a space before uppercase letters,
  // converts the string to lowercase and then converts
  // the first letter to uppercase
  return key.replace(/([A-Z])/g, ' $1')
}
