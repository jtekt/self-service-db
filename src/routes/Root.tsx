import { useNavigate } from "react-router-dom"
import Cookies from "universal-cookie"
import { useEffect } from "react"
export default function () {
  const cookies = new Cookies()

  const token = cookies.get("token")

  const navigate = useNavigate()

  useEffect(() => {
    if (!token) navigate("/login")
    else navigate("/databases")
  }, [])

  return <div>Authenticating...</div>
}
