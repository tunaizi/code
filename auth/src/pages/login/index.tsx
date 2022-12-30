import * as React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "@/auth"
import LoadingIcon from "@/components/icon/loginicon"

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const auth = useAuth()

  const from = location.state?.from?.pathname || "/"

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    let formData = new FormData(event.currentTarget)
    let username = formData.get("username") as string
    username && auth.setLoading(true)
    !username && window.alert("you not  input username ")
    username &&
      auth.signin(username, () => {
        navigate(from, { replace: true })
        auth.setLoading(!true)
        localStorage.setItem("username", username)
        // setTimeout(() => {
        //   auth.signout(() => {
        //     localStorage.removeItem("username")
        //     window.alert("overdue of login state")
        //     navigate("/login")
        //   })
        // }, 1000 * 60)
        //取消60秒后退出....
      })
  }

  return (
    <div>
      <p>You must log in to view the page at {from}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Username: <input name="username" type="text" />
        </label>{" "}
        <button className="sigin-in" type="submit">
          Login
          <LoadingIcon loading={auth.loading} />
        </button>
      </form>
    </div>
  )
}
