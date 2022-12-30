import * as React from "react"
import Progess from "@/components/progess"

export default function ProtectedPage() {
  const [progess, setProgess] = React.useState(0)
  React.useEffect(() => {
    if (progess < 100) {
      setTimeout(() => {
        const np = progess + 3
        setProgess(np > 100 ? 100 : np)
      }, 100)
    }
  })
  return (
    <div className="protected">
      <Progess progess={progess}></Progess>
    </div>
  )
}
