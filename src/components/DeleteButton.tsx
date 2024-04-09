import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

export default function () {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const { name } = useParams()

  async function deleteDb() {
    if (!confirm("Delete DB?")) return

    setLoading(true)
    try {
      await axios.delete(`/databases/${name}`)

      navigate("/databases")
    } catch (error: any) {
      if (error.response.status === 401) return navigate("/login")
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
