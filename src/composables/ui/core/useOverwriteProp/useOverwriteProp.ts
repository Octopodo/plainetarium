export function useOverwriteProp<T extends { [key: string]: any }>(
  propsObj: T,
  propName: keyof T,
  newPropName: string,
  newPropValue: any
): T & { [K in typeof newPropName]?: any } {
  const { [propName]: old, ...rest } = propsObj
  const newObj = { ...rest, [newPropName]: newPropValue } as T & {
    [K in typeof newPropName]?: any
  }
  return newObj
}
