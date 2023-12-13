import boxes from './boxes.js'
import { phi, sqrt2 } from './ratios.js'

const computeRatioValue = (r) => {
  const dphi = Math.abs(r - phi)
  const dsqrt2 = Math.abs(r - sqrt2)
  const d2 = Math.abs(r - 2)
  const d1 = Math.abs(r - 1)

  return (
    (dphi < 0.1 ? 1 : 0) +
    (dsqrt2 < 0.1 ? 1 : 0) +
    (d2 < 0.1 ? 1 : 0) +
    (d1 < 0.05 ? 1 : 0)
  )
}

const computeBoxValue = (box) => {
  // Features:
  // near a golden ratio
  // near sqrt 2
  // near 2
  const ratios = [
    box[0] / box[1],
    box[0] / box[2],
    box[1] / box[2]
  ]

  const ratiosValue = ratios.reduce((acc, r) => {
    return acc + computeRatioValue(r)
  }, 0)

  return ratiosValue
}

// Process
const valuations = boxes.map(box => {
  const value = computeBoxValue(box)
  return { box, value }
})
valuations.sort((a, b) => a.value - b.value)

// Rendering
console.log('WxDxH: Value')
valuations.forEach(valuation => {
  const { box, value } = valuation
  console.log(`${box[0]}x${box[1]}x${box[2]}: ${value}`)
})
