export const CIRCLE_CORNER_EXTENTS = 70.7107
export function getBoxCornerDistance(radiusX: number, radiusY?: number) {
  radiusY = radiusY || radiusX // Si no se proporciona radiusY, usamos radiusX
  return Math.sqrt(Math.pow(radiusX, 2) + Math.pow(radiusY, 2))
}

export function getBoxCornerExtentPercentage(radius: number, cornerDistance: number) {
  return (radius / cornerDistance) * 100
}

export function calculateGradientEndPoint(radiusX: number, deviation?: number) {
  deviation = deviation || 0
  const cornerDistance = getBoxCornerDistance(radiusX)
  const extentPercentage = getBoxCornerExtentPercentage(radiusX, cornerDistance) + deviation
  return `${extentPercentage}%`
}
