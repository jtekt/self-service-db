"use client"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { useState } from "react"
import axios from "axios"
import Cookies from "universal-cookie"
import { TOKEN_COOKIE_NAME } from "@/config"

export default function () {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const { name } = useParams()

  async function deleteDb() {
    if (!confirm("Delete DB?")) return

    setLoading(true)
    const cookies = new Cookies()
    const token = cookies.get(TOKEN_COOKIE_NAME)
    const headers = { Authorization: `Bearer ${token}` }
    try {
      await axios.delete(`/api/databases/${name}`, { headers })

      router.push("/databases")
    } catch (error: any) {
      if (error.response.status === 401) return router.push("/login")
      alert("Data query failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button disabled={loading} type="submit" onClick={deleteDb}>
      {loading ? (
        <Loader2 className="mx-auto h-4 w-4 animate-spin" />
      ) : (
        <span>Delete</span>
      )}
    </Button>
  )
}
