/**
 *  @name progess 环形进度条
 *  @param {Number} height
 *  @param {Number} width
 *  @param {Number} radius
 *  @param {Number} startDeg
 *  @param {Number} strokeWidth
 *  @param {Number} alpha
 *  @param {Number} fontSize
 *  @param {Number} progess
 *  @param {String} unit
 *  @param {String Number} fontWeight
 *  @param { "butt" | "round" | "square" | "inherit" | undefined } strokeLinecap
 */

import * as React from "react"
interface ProgessProp {
  height?: number
  width?: number
  radius?: number
  startDeg?: number
  strokeWidth?: number
  unit?: string
  strokeLinecap?: "butt" | "round" | "square" | "inherit"
  alpha?: number
  progess: number
  fontWeight?: number
  fontSize?: number
}
function Progess(props: ProgessProp): JSX.Element {
  const {
    height = 300,
    width = 300,
    radius = 100,
    startDeg = -90,
    strokeWidth = 30,
    unit = "%",
    strokeLinecap = undefined,
    alpha = 1,
    progess = 0,
    fontWeight = 50,
    fontSize = 60
  } = props
  function setStrokeColor() {
    const red = 255 + (parseInt(String(0 - 255)) / 100) * progess
    const green = 0 + (parseInt(String(128 - 0)) / 100) * progess
    const blue = 0 + (parseInt(String(255 - 0)) / 100) * progess
    return `rgba(${red},${green},${blue},${alpha})`
  }
  const center = parseInt(String(width / 2))
  const ratio = (Math.floor(2 * Math.PI * parseFloat(String(radius))) * progess) / 100
  const strokeColor = setStrokeColor()
  return (
    <svg
      xmlns="http://www.w3.org/200/svg"
      height={height + "px"}
      width={width + "px"}
      viewBox={`0 0 ${height} ${width}`}
    >
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke={"grey"}
        strokeWidth={strokeWidth}
        className="progess-background"
      ></circle>
      <circle
        fill="none"
        strokeWidth={strokeWidth}
        transform={`rotate(${startDeg},${center},${center})`}
        cx={center}
        cy={center}
        r={radius}
        stroke={strokeColor}
        strokeLinecap={strokeLinecap}
        className="progess"
        strokeDasharray={`${ratio},1000`}
      ></circle>
      <text
        fontWeight={fontWeight}
        className="progess-text"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={fontSize}
        x={center}
        y={center}
        fill={strokeColor}
      >
        {progess + unit}
      </text>
    </svg>
  )
}
export default Progess
