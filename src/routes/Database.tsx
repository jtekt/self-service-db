import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import Cookies from "universal-cookie"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { useParams } from "react-router-dom"
import DeleteButton from "@/components/DeleteButton"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const { VITE_API_URL, VITE_DB_HOST, VITE_DB_PORT } = import.meta.env

export default function () {
  const [loading, setLoading] = useState(false)
  const [database, setDatabase] = useState<any>()

  const navigate = useNavigate()
  const { name } = useParams()

  async function getData() {
    const cookies = new Cookies()
    const token = cookies.get("token")

    const url = `${VITE_API_URL}/databases/${name}`

    const headers = {
      Authorization: `Bearer ${token}`,
    }

    const options = { headers }

    setLoading(true)
    try {
      const response = await fetch(url, options)
      if (response.status === 401) return navigate("/login")
      const data = await response.json()
      setDatabase(data)
    } catch (error) {
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
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/databases">Databases</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {database ? database.db : "Database"}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>{database ? database.db : "Database"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end">
            <DeleteButton />
          </div>
          {loading ? (
            <Loader2 className="mx-auto h-12 w-12 animate-spin" />
          ) : (
            <></>
          )}
          {database ? (
            <>
              <p>Host: {VITE_DB_HOST || database.host}</p>
              <p>Port: {VITE_DB_PORT || database.port}</p>
              <p>Database: {database.db}</p>
              <p>User: {database.username}</p>
              <p>
                Connection string:{" "}
                {`postgresql://${database.username}:YOUR_PASSWORD@${
                  VITE_DB_HOST || database.host
                }:${VITE_DB_PORT || database.port}/${database.db}`}
              </p>
            </>
          ) : (
            <></>
          )}
        </CardContent>
      </Card>
    </>
  )
}
