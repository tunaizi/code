import * as React from "react"
import { Link } from "react-router-dom"

export default function NoFound() {
  return (
    <div>
      <h1>Nothing to see here!</h1>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  )
}
