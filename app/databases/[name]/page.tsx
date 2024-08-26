import DeleteButton from "@/components/DeleteButton"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { useParams } from "next/navigation"

import { env } from "next-runtime-env"
import { getDatabaseCache } from "@/actions/databases"

export default async function DatabasePage({
  params,
}: {
  params: { name: string }
}) {
  const NEXT_PUBLIC_DB_HOST = env("NEXT_PUBLIC_DB_HOST")
  const NEXT_PUBLIC_DB_PORT = env("NEXT_PUBLIC_DB_PORT")

  // const router = useRouter()
  // const { name } = useParams()

  const database = await getDatabaseCache(params.name)

  // async function getData() {
  //   const cookies = new Cookies()
  //   const token = cookies.get(TOKEN_COOKIE_NAME)
  //   const headers = { Authorization: `Bearer ${token}` }
  //   setLoading(true)
  //   try {
  //     const { data } = await axios.get(`/api/databases/${name}`, { headers })
  //     setDatabase(data)
  //   } catch (error: any) {
  //     if (error.response.status === 401) return router.push("/login")
  //     alert("Data query failed")
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // useEffect(() => {
  //   getData()
  // }, [])

  return (
    <>
      <div className="mt-4">
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
        <div className="flex justify-between my-4 ">
          <h2 className="text-4xl">{database ? database.db : "Database"}</h2>
          <DeleteButton name={params.name} />
        </div>
        <p>Host: {NEXT_PUBLIC_DB_HOST || database.host}</p>
        <p>Port: {NEXT_PUBLIC_DB_PORT || database.port}</p>
        <p>Database: {database.db}</p>
        <p>User: {database.username}</p>
        <p>SSL: no</p>
        <p>
          Connection string: postgresql://{database.username}:
          <span className="text-primary">YOUR_PASSWORD</span>@
          {NEXT_PUBLIC_DB_HOST || database.host}:
          {NEXT_PUBLIC_DB_PORT || database.port}/{database.db}
        </p>
      </div>
    </>
  )
}
