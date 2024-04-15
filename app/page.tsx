"use client"
import { useRouter } from "next/navigation"
import Cookies from "universal-cookie"
import { useEffect } from "react"
import { TOKEN_COOKIE_NAME } from "@/config"
import { Loader2 } from "lucide-react"

export default function () {
  const cookies = new Cookies()

  const token = cookies.get(TOKEN_COOKIE_NAME)

  const router = useRouter()

  useEffect(() => {
    if (!token) router.push("/login")
    else router.push("/databases")
  }, [])

  return <Loader2 className="mx-auto h-12 w-12 animate-spin" />
}
