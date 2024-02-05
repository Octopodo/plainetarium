import { computed } from 'vue'
interface DevLightPropsType {}

export const DevProps = {
  dev: Boolean
}
export function useDevLight(props: Required<DevLightPropsType>) {
  return {
    borderRadius: 0
  }
}
