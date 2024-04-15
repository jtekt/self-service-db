import { useNavigate } from "react-router-dom"
import Cookies from "universal-cookie"
import { useEffect } from "react"
import { TOKEN_COOKIE_NAME } from "@/config"

export default function () {
  const cookies = new Cookies()

  const token = cookies.get(TOKEN_COOKIE_NAME)

  const navigate = useNavigate()

  useEffect(() => {
    if (!token) navigate("/login")
    else navigate("/databases")
  }, [])

  return <div>Authenticating...</div>
}
