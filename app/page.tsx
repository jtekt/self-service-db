"use client"
import { useRouter } from "next/navigation"
import Cookies from "universal-cookie"
import { useEffect } from "react"
import { TOKEN_COOKIE_NAME } from "@/config"

export default function () {
  const cookies = new Cookies()

  const token = cookies.get(TOKEN_COOKIE_NAME)

  const router = useRouter()

  useEffect(() => {
    if (!token) router.push("/login")
    else router.push("/databases")
  }, [])

  return <div>Authenticating...</div>
}
