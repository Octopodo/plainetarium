export function useCustomProps(props: Object, customProps: Object) {
  const extractedProps = Object.keys(props)
    .filter((key) => key in customProps)
    .reduce((obj: Record<string, any>, key: string) => {
      obj[key] = props[key as keyof typeof props]
      return obj
    }, {})

  return extractedProps
}
