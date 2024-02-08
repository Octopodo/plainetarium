export function unWrapCamelCase(key: string): string {
  // Inserts a space before uppercase letters,
  // converts the string to lowercase and then converts
  // the first letter to uppercase
  const str = key.replace(/(.)([A-Z])/g, '$1 $2')
  return str.charAt(0).toUpperCase() + str.slice(1)
}
