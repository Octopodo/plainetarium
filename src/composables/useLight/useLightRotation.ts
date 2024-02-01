export interface LightRotationParams {
  xRotation: number | string
  yRotation: number | string
}

export const LightRotationProps = {
  xRotation: { type: [Number, String], default: 0 },
  yRotation: { type: [Number, String], default: 0 }
}

export function useLightRotation(props: Required<LightRotationParams>) {}
