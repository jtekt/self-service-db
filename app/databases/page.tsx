"use client"
import { useEffect, useState } from "react"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Cookies from "universal-cookie"
import { Loader2 } from "lucide-react"
import axios from "axios"
import { TOKEN_COOKIE_NAME } from "@/config"

export default function () {
  const [loading, setLoading] = useState(false)
  const [databases, setDatabases] = useState<any[]>([])

  const router = useRouter()

  async function getData() {
    const cookies = new Cookies()
    const token = cookies.get(TOKEN_COOKIE_NAME)
    const headers = { Authorization: `Bearer ${token}` }
    setLoading(true)
    try {
      const { data } = await axios.get("/api/databases", { headers })
      setDatabases(data.items)
    } catch (error: any) {
      if (error.response.status === 401) return router.push("/login")
      alert("Data query failed")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <div className="flex justify-between mt-4 ">
        <h2 className="text-4xl">Databases</h2>
        <Button asChild>
          <Link
            className={buttonVariants({ variant: "outline" })}
            href="/databases/new"
          >
            New
          </Link>
        </Button>
      </div>
      <div className="mt-6">
        {loading ? (
          <Loader2 className="mx-auto h-12 w-12 animate-spin" />
        ) : (
          <ul>
            {databases.map((database: any) => (
              <li key={database} className="my-2">
                <Link href={`/databases/new`}>{database}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}
