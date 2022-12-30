import * as React from "react"
import { Outlet } from "react-router-dom"
export default function HomeCheck() {
  return (
    <h1>
      HomeCheck
      <div className="checkbox" style={{ width: 800, height: 200, backgroundColor: "green" }}>
        <Outlet></Outlet>
      </div>
    </h1>
  )
}
