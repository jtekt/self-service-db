import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import Cookies from "universal-cookie"
import { useState } from "react"
import { TOKEN_COOKIE_NAME } from "@/config"

const { VITE_API_URL } = import.meta.env

export default function () {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const { name } = useParams()

  async function deleteDb() {
    if (!confirm("Delete DB?")) return
    const cookies = new Cookies()
    const token = cookies.get(TOKEN_COOKIE_NAME)

    const url = `${VITE_API_URL}/databases/${name}`

    const headers = {
      Authorization: `Bearer ${token}`,
    }

    const options = { headers, method: "DELETE" }

    setLoading(true)
    try {
      const response = await fetch(url, options)
      if (response.status === 401) {
        cookies.remove(TOKEN_COOKIE_NAME)
        return navigate("/login")
      }
      await response.json()
      navigate("/databases")
    } catch (error) {
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
