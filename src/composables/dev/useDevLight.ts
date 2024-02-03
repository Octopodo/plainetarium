import { computed } from 'vue'
interface DevLightPropsType {}
export function useDevLight(props: Required<DevLightPropsType>) {
  return {
    borderRadius: 0
  }
}
