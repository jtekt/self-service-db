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
import axios from "axios"

const { VITE_DB_HOST, VITE_DB_PORT } = import.meta.env

export default function () {
  const [loading, setLoading] = useState(false)
  const [database, setDatabase] = useState<any>()

  const navigate = useNavigate()
  const { name } = useParams()

  async function getData() {
    setLoading(true)
    try {
      const { data } = await axios.get(`/databases/${name}`)
      setDatabase(data)
    } catch (error: any) {
      if (error.response.status === 401) return navigate("/login")
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
      <div className="flex justify-between mt-4 ">
        <h2 className="text-4xl">{database ? database.db : "Database"}</h2>
        <DeleteButton />
      </div>

      <div className="mt-4">
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
      </div>
    </>
  )
}
